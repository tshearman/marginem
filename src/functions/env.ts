type Env = {
	RESEND_API_KEY?: string;
	RESEND_AUDIENCE_ID?: string;
	RESEND_FROM_EMAIL?: string;
	RESEND_FROM_NAME?: string;
	NEWSLETTER_SITE_URL?: string;
	SUBSCRIBE_HMAC_SECRET?: string;
	TURNSTILE_SECRET_KEY?: string;
};

const getEnvValue = (env: Env, key: keyof Env): string =>
	env?.[key] ?? process.env[key] ?? "";

export type { Env };
export { getEnvValue };
