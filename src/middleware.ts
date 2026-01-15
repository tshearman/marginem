import type { MiddlewareHandler } from "astro";
import { ensureVisitorId } from "./lib/visitor";

export const onRequest: MiddlewareHandler = async (context, next) => {
	ensureVisitorId(context.cookies);
	return next();
};
