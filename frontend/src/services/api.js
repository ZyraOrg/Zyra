const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://zyraapi.vercel.app";

function buildUrl(path) {
  return `${BASE_URL || ""}${path}`;
}

async function post(path, body) {
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
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
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  if (data?.authenticated === false) {
    const err = new Error("Unauthorized");
    err.response = { data };
    throw err;
  }
  return { data };
}

async function createCampaign(payload) {
  return post("/api/campaigns/create", payload);
}

async function uploadCampaignCover(campaignId, file) {
  const url = buildUrl(`/api/campaigns/${campaignId}/cover`);
  const formData = new FormData();
  formData.append("cover", file);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  return { data };
}

async function getMyCampaigns({ limit = 4, offset = 0 } = {}) {
  const url = buildUrl(`/api/campaigns/mine?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`);
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  return { data };
}

async function getCampaign(id) {
  const url = buildUrl(`/api/campaigns/${encodeURIComponent(id)}`);
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  return { data };
}

async function deleteCampaign(id) {
  const url = buildUrl(`/api/campaigns/${encodeURIComponent(id)}`);
  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  return { data };
}

async function getProfile() {
  const url = buildUrl(`/api/profile`);
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  return { data };
}

async function saveProfile(payload) {
  const url = buildUrl(`/api/profile`);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload ?? {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || "Request failed");
    err.response = { data };
    throw err;
  }
  return { data };
}

export default {
  post,
  signupUser,
  loginUser,
  getUser,
  createCampaign,
  uploadCampaignCover,
  getMyCampaigns,
  getCampaign,
  deleteCampaign,
  getProfile,
  saveProfile,
};
