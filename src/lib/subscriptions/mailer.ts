import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { SITE_NAME } from "../site";

const env = {
	host: process.env.SUBSCRIPTIONS_SMTP_HOST,
	port: Number(process.env.SUBSCRIPTIONS_SMTP_PORT ?? "587"),
	user: process.env.SUBSCRIPTIONS_SMTP_USER,
	pass: process.env.SUBSCRIPTIONS_SMTP_PASS,
	secure: process.env.SUBSCRIPTIONS_SMTP_SECURE === "true",
	fromEmail: process.env.SUBSCRIPTIONS_FROM_EMAIL,
	fromName: process.env.SUBSCRIPTIONS_FROM_NAME ?? SITE_NAME,
};

const requireEnv = () => {
	const missing: string[] = [];
	if (!env.host) missing.push("SUBSCRIPTIONS_SMTP_HOST");
	if (!env.port) missing.push("SUBSCRIPTIONS_SMTP_PORT");
	if (!env.user) missing.push("SUBSCRIPTIONS_SMTP_USER");
	if (!env.pass) missing.push("SUBSCRIPTIONS_SMTP_PASS");
	if (!env.fromEmail) missing.push("SUBSCRIPTIONS_FROM_EMAIL");

	if (missing.length) {
		throw new Error(
			`Missing SMTP settings for subscriptions: ${missing.join(", ")}`,
		);
	}
};

let transporter: Transporter | null = null;

const getTransporter = () => {
	if (transporter) return transporter;
	requireEnv();
	transporter = nodemailer.createTransport({
		host: env.host,
		port: env.port,
		secure: env.secure,
		auth: { user: env.user, pass: env.pass },
	});
	return transporter;
};

export const sendConfirmationEmail = async (
	email: string,
	confirmationUrl: string,
) => {
	const from = env.fromName
		? `${env.fromName} <${env.fromEmail}>`
		: env.fromEmail;

	const html = `
		<p>Thanks for subscribing to ${SITE_NAME}!</p>
		<p>Please confirm your email by clicking the link below:</p>
		<p><a href="${confirmationUrl}">Confirm your subscription</a></p>
		<p>If you didn't request this, you can ignore this email.</p>
	`;

	const text = [
		`Thanks for subscribing to ${SITE_NAME}!`,
		"",
		"Please confirm your email by visiting this link:",
		confirmationUrl,
		"",
		"If you didn't request this, you can ignore this email.",
	].join("\n");

	const transport = getTransporter();
	await transport.sendMail({
		to: email,
		from,
		subject: `${SITE_NAME} subscription confirmation`,
		text,
		html,
	});
};

export const sendUnsubscribeEmail = async (
	email: string,
	unsubscribeUrl: string,
) => {
	const from = env.fromName
		? `${env.fromName} <${env.fromEmail}>`
		: env.fromEmail;

	const html = `
		<p>You requested to unsubscribe from ${SITE_NAME}.</p>
		<p>If this was you, click below to confirm:</p>
		<p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
		<p>If you didn't request this, you can ignore this email.</p>
	`;

	const text = [
		`You requested to unsubscribe from ${SITE_NAME}.`,
		"",
		"To confirm, visit this link:",
		unsubscribeUrl,
		"",
		"If you didn't request this, ignore this email.",
	].join("\n");

	const transport = getTransporter();
	await transport.sendMail({
		to: email,
		from,
		subject: `Unsubscribe from ${SITE_NAME}`,
		text,
		html,
	});
};
