export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Base site URL used for OAuth redirects (fall back to current origin in browser)
export const SITE_URL =
	import.meta.env.VITE_SITE_URL ||
	(typeof window !== "undefined" ? window.location.origin : "");