import { execFileSync } from "node:child_process";
import path from "node:path";

const run = (command, args, options = {}) => {
	const result = execFileSync(command, args, {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
		...options,
	});
	return result.trim();
};

const runInherit = (command, args) =>
	execFileSync(command, args, { stdio: "inherit" });

const formatTimestamp = () => {
	const now = new Date();
	const pad = (value) => String(value).padStart(2, "0");
	return [
		now.getFullYear(),
		pad(now.getMonth() + 1),
		pad(now.getDate()),
		"-",
		pad(now.getHours()),
		pad(now.getMinutes()),
		pad(now.getSeconds()),
	].join("");
};

const sanitizeMessage = (message) => {
	if (!message) return "";
	const firstLine = message.split("\n").find(Boolean) ?? "";
	return firstLine.replace(/^["'`]+|["'`]+$/g, "").trim().slice(0, 72);
};

const fetchCommitMessage = async (diff) => {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) return "";
	const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
	const truncatedDiff = diff.length > 12000 ? `${diff.slice(0, 12000)}\n` : diff;
	const payload = {
		model,
		messages: [
			{
				role: "system",
				content:
					"You write concise git commit messages. Use imperative mood, no trailing period, max 72 chars.",
			},
			{
				role: "user",
				content: `Summarize the staged changes in one line.\n\nDiff:\n${truncatedDiff}`,
			},
		],
		temperature: 0.2,
		max_tokens: 60,
	};

	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) return "";
	const data = await response.json();
	const content = data?.choices?.[0]?.message?.content;
	return sanitizeMessage(content);
};

const main = async () => {
	runInherit("node", [path.join("scripts", "sync-obsidian.mjs")]);

	runInherit("git", ["add", "-A"]);

	try {
		run("git", ["diff", "--staged", "--quiet"]);
		console.log("No changes to deploy.");
		return;
	} catch {
		// continue when there are staged changes
	}

	const diff = run("git", ["diff", "--staged"]);
	let message = await fetchCommitMessage(diff);
	if (!message) {
		message = "Sync Obsidian content";
	}
	runInherit("git", ["commit", "-m", message]);

	const tagPrefix = process.env.DEPLOY_TAG_PREFIX || "deploy";
	const tagName = `${tagPrefix}-${formatTimestamp()}`;
	runInherit("git", ["tag", tagName]);

	const remote = process.env.DEPLOY_REMOTE || "origin";
	const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
	runInherit("git", ["push", remote, branch, "--follow-tags"]);
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
