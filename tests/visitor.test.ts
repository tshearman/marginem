import { beforeEach, describe, expect, it, vi } from "vitest";

type CookieValue = { value: string; options?: Record<string, unknown> };

class FakeCookies {
	private store = new Map<string, CookieValue>();

	get(name: string) {
		const value = this.store.get(name);
		return value ? { value: value.value } : undefined;
	}

	set(name: string, value: string, options?: Record<string, unknown>) {
		this.store.set(name, { value, options });
	}
}

const setVisitorSecret = () => {
	process.env.VISITOR_COOKIE_SECRET = "test-secret";
};

beforeEach(() => {
	vi.resetModules();
	setVisitorSecret();
});

describe("visitor cookies", () => {
	it("reuses an existing valid visitor cookie", async () => {
		const module = await import("../src/lib/visitor");
		const cookies = new FakeCookies();

		const firstId = module.ensureVisitorId(cookies as any);
		const cookieName = module.getVisitorCookieName();
		const stored = cookies.get(cookieName);
		expect(stored?.value).toBeDefined();

		// Should read the same ID and avoid issuing a new one.
		const secondId = module.ensureVisitorId(cookies as any);
		expect(secondId).toBe(firstId);
		expect(module.readVisitorId(cookies as any)).toBe(firstId);
	});

	it("rejects tampered cookies and issues a new visitor id", async () => {
		const module = await import("../src/lib/visitor");
		const cookies = new FakeCookies();

		const originalId = module.ensureVisitorId(cookies as any);
		const cookieName = module.getVisitorCookieName();
		const stored = cookies.get(cookieName);
		expect(stored?.value).toBeDefined();

		// Tamper with the signature.
		cookies.set(cookieName, `${stored?.value}corrupted`);
		expect(module.readVisitorId(cookies as any)).toBeNull();

		const newId = module.ensureVisitorId(cookies as any);
		expect(newId).not.toBe(originalId);
	});
});
