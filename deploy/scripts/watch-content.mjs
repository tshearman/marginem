#!/usr/bin/env node
/**
 * Content watcher + blue/green promoter.
 *
 * Watches a host-side staging directory for content changes, batches updates,
 * rebuilds the site into the inactive color's dist dir, health checks it, and
 * flips ACTIVE_COLOR in nginx without restarting the proxy container.
 */
import { exec as execCb } from "node:child_process";
import fs from "node:fs";
import { promises as fsp } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const exec = (cmd, opts = {}) =>
	new Promise((resolve, reject) => {
		const child = execCb(cmd, { stdio: "inherit", ...opts }, (err, stdout, stderr) => {
			if (err) {
				err.stdout = stdout;
				err.stderr = stderr;
				return reject(err);
			}
			resolve({ stdout, stderr });
		});
		child.stdout?.pipe(process.stdout);
		child.stderr?.pipe(process.stderr);
	});

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..");

const defaultEnvPath = path.resolve(repoRoot, "deploy", "config", "deploy.env");
const composeFile = path.resolve(repoRoot, "deploy", "docker-compose.bluegreen.yml");
const nginxTemplatePath = "/etc/nginx/templates/default.conf.template";
const nginxConfPath = "/etc/nginx/conf.d/default.conf";

const parseEnvFile = async (filePath) => {
	const content = await fsp.readFile(filePath, "utf8");
	const env = {};
	for (const line of content.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const idx = trimmed.indexOf("=");
		if (idx === -1) continue;
		const key = trimmed.slice(0, idx).trim();
		const value = trimmed.slice(idx + 1).trim();
		env[key] = value.replace(/^"(.*)"$/, "$1");
	}
	return env;
};

const updateEnvFile = async (filePath, updates) => {
	const content = await fsp.readFile(filePath, "utf8");
	const lines = content.split("\n");
	const keys = new Set(Object.keys(updates));
	const updated = lines.map((line) => {
		const trimmed = line.trim();
		const idx = trimmed.indexOf("=");
		if (idx === -1) return line;
		const key = trimmed.slice(0, idx).trim();
		if (!keys.has(key)) return line;
		return `${key}=${updates[key]}`;
	});
	// Add any missing keys
	for (const key of keys) {
		if (!lines.some((line) => line.trim().startsWith(`${key}=`))) {
			updated.push(`${key}=${updates[key]}`);
		}
	}
	await fsp.writeFile(filePath, updated.join("\n"), "utf8");
};

const log = (...args) => console.log(new Date().toISOString(), "-", ...args);

const ensureDir = async (dir) => {
	await fsp.mkdir(dir, { recursive: true });
};

const copyDist = async (from, to) => {
	await fsp.rm(to, { recursive: true, force: true });
	await ensureDir(to);
	await fsp.cp(from, to, { recursive: true });
};

const runBuild = async () => {
	log("Building site...");
	await exec("npm run build", { cwd: repoRoot });
	log("Build completed");
};

const healthCheck = async ({ targetColor, appPort, healthPath, retries, timeoutMs }) => {
	const url = `http://app-${targetColor}:${appPort}${healthPath}`;
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			await exec(
				`docker compose --env-file ${defaultEnvPath} -f ${composeFile} exec reverse-proxy wget -q --timeout=${Math.ceil(
					timeoutMs / 1000,
				)} --spider ${url}`,
				{ cwd: repoRoot },
			);
			log(`Health check succeeded for ${targetColor} at ${url}`);
			return true;
		} catch (err) {
			log(`Health check failed for ${targetColor} (attempt ${attempt}/${retries})`);
			if (attempt === retries) return false;
			await delay(1000);
		}
	}
	return false;
};

const reloadNginx = async ({ activeColor, appPort, healthPath }) => {
	const cmd = [
		`ACTIVE_COLOR=${activeColor}`,
		`APP_PORT=${appPort}`,
		`PROMOTION_HEALTH_PATH=${healthPath}`,
		"envsubst < ${NGINX_TEMPLATE} > ${NGINX_CONF}",
		"nginx -s reload",
	].join(" && ");

	await exec(
		[
			"docker compose",
			`--env-file ${defaultEnvPath}`,
			`-f ${composeFile}`,
			"exec reverse-proxy",
			"sh -c",
			`'NGINX_TEMPLATE=${nginxTemplatePath} NGINX_CONF=${nginxConfPath} ${cmd}'`,
		].join(" "),
		{ cwd: repoRoot },
	);
	log(`Nginx reloaded with ACTIVE_COLOR=${activeColor}`);
};

const restartApp = async (color) => {
	log(`Restarting app-${color} with latest build...`);
	await exec(
		`docker compose --env-file ${defaultEnvPath} -f ${composeFile} up -d app-${color}`,
		{ cwd: repoRoot },
	);
};

const promote = async (targetColor, env) => {
	const appPort = env.APP_PORT || "4321";
	const healthPath = env.PROMOTION_HEALTH_PATH || "/health";
	const retries = Number(env.PROMOTION_HEALTH_RETRIES || "3");
	const timeoutMs = Number(env.PROMOTION_HEALTH_TIMEOUT_SECONDS || "5") * 1000;

	await restartApp(targetColor);
	const healthy = await healthCheck({
		targetColor,
		appPort,
		healthPath,
		retries,
		timeoutMs,
	});
	if (!healthy) {
		log(`Health checks failed for ${targetColor}; keeping current color live.`);
		return;
	}
	await reloadNginx({ activeColor: targetColor, appPort, healthPath });
	await updateEnvFile(defaultEnvPath, { ACTIVE_COLOR: targetColor });
	log(`Promotion complete: ACTIVE_COLOR=${targetColor}`);
};

const main = async () => {
	const env = await parseEnvFile(defaultEnvPath);

	const stagingDir = env.CONTENT_STAGING_DIR
		? path.resolve(env.CONTENT_STAGING_DIR)
		: path.resolve(repoRoot, "content");
	const quietMs =
		Number(env.CONTENT_WATCH_QUIET_SECONDS || "60") * 1000;
	const minIntervalMs =
		Number(env.CONTENT_BUILD_RATE_LIMIT_SECONDS || "300") * 1000;
	const buildsRoot = path.resolve(repoRoot, "deploy", "builds");
	const distDir = path.resolve(repoRoot, "dist");

	log("Watcher starting with config:", {
		stagingDir,
		quietSeconds: quietMs / 1000,
		rateLimitSeconds: minIntervalMs / 1000,
	});

	await ensureDir(stagingDir);

	let timer = null;
	let lastBuildAt = 0;

	const scheduleBuild = () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(async () => {
			const now = Date.now();
			if (now - lastBuildAt < minIntervalMs) {
				const waitMs = minIntervalMs - (now - lastBuildAt);
				log(`Rate limiting builds; waiting ${Math.ceil(waitMs / 1000)}s`);
				timer = setTimeout(scheduleBuild, waitMs);
				return;
			}

			const currentEnv = await parseEnvFile(defaultEnvPath);
			const activeColor = (currentEnv.ACTIVE_COLOR || "blue").toLowerCase();
			const targetColor = activeColor === "blue" ? "green" : "blue";
			const targetDist = path.join(buildsRoot, targetColor, "dist");

			try {
				await runBuild();
				await copyDist(distDir, targetDist);
				log(`Copied dist → ${targetDist}`);
				await promote(targetColor, currentEnv);
				lastBuildAt = Date.now();
			} catch (err) {
				console.error("Build/promotion failed:", err);
			} finally {
				timer = null;
			}
		}, quietMs);
	};

	fs.watch(stagingDir, { recursive: true }, (_event, filename) => {
		if (!filename) return;
		log("Change detected in staging content:", filename);
		scheduleBuild();
	});

	log("Watching for content changes...");
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
