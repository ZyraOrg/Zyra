const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://zyraapi.vercel.app";

// Optional: If the browser blocks cross-site cookies, fall back to Bearer auth
// using the Supabase client session (works well for Google OAuth).
import supabase, { isSupabaseConfigured } from "../lib/supabaseClient";

function buildUrl(path) {
  return `${BASE_URL || ""}${path}`;
}

async function maybeAddSupabaseAuthHeaders(headers) {
  try {
    if (!isSupabaseConfigured || !supabase) return headers;
    const { data } = await supabase.auth.getSession();
    const accessToken = data?.session?.access_token;
    if (!accessToken) return headers;

    // Don't overwrite an explicit Authorization header.
    if (headers && Object.prototype.hasOwnProperty.call(headers, "Authorization")) return headers;

    return { ...(headers || {}), Authorization: `Bearer ${accessToken}` };
  } catch {
    return headers;
  }
}

async function post(path, body) {
  const url = buildUrl(path);
  const headers = await maybeAddSupabaseAuthHeaders({ "Content-Type": "application/json" });
  const res = await fetch(url, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(body ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function signupUser(formData) {
  return post("/api/signup", formData);
}

async function loginUser(formData) {
  return post("/api/login", formData);
}

async function getUser() {
  const url = buildUrl("/api/user");
  const headers = await maybeAddSupabaseAuthHeaders(undefined);
  const res = await fetch(url, {
    method: "GET",
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  if (data?.authenticated === false) {
    const err = new Error("Unauthorized");
    err.response = { status: 401, data };
    throw err;
  }
  return { data };
}

async function exchangeSupabaseSession({ accessToken, expiresIn } = {}) {
  return post("/api/oauth/exchange", {
    access_token: accessToken,
    expires_in: expiresIn,
  });
}

async function createCampaign(payload) {
  return post("/api/campaigns/create", payload);
}

async function uploadCampaignCover(campaignId, file) {
  const url = buildUrl(`/api/campaigns/${campaignId}/cover`);
  const formData = new FormData();
  formData.append("cover", file);

  const headers = await maybeAddSupabaseAuthHeaders(undefined);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

// NEW FUNCTION: Upload multiple campaign documents
async function uploadCampaignDocuments(campaignId, files) {
  const url = buildUrl(`/api/campaigns/${campaignId}/documents`);
  const formData = new FormData();
  
  // Append all files to FormData
  files.forEach((file, index) => {
    formData.append('documents', file);
  });

  const headers = await maybeAddSupabaseAuthHeaders(undefined);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function getMyCampaigns({ limit = 4, offset = 0 } = {}) {
  const url = buildUrl(`/api/campaigns/mine?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`);
  const headers = await maybeAddSupabaseAuthHeaders(undefined);
  const res = await fetch(url, {
    method: "GET",
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function getCampaign(id) {
  const url = buildUrl(`/api/campaigns/${encodeURIComponent(id)}`);
  const headers = await maybeAddSupabaseAuthHeaders(undefined);
  const res = await fetch(url, {
    method: "GET",
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function deleteCampaign(id) {
  const url = buildUrl(`/api/campaigns/${encodeURIComponent(id)}`);
  const headers = await maybeAddSupabaseAuthHeaders(undefined);
  const res = await fetch(url, {
    method: "DELETE",
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function getProfile() {
  const url = buildUrl(`/api/profile`);
  const headers = await maybeAddSupabaseAuthHeaders(undefined);
  const res = await fetch(url, {
    method: "GET",
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function saveProfile(payload) {
  const url = buildUrl(`/api/profile`);
  const headers = await maybeAddSupabaseAuthHeaders({ "Content-Type": "application/json" });
  const res = await fetch(url, {
    method: "PUT",
    headers,
    credentials: "include",
    body: JSON.stringify(payload ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

export default {
  post,
  signupUser,
  loginUser,
  exchangeSupabaseSession,
  getUser,
  createCampaign,
  uploadCampaignCover,
  uploadCampaignDocuments, // NEW
  getMyCampaigns,
  getCampaign,
  deleteCampaign,
  getProfile,
  saveProfile,
};