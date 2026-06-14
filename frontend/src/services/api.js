const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const TOKEN_KEY = 'zyra-token';
const REFRESH_KEY = 'zyra-refresh';
const SESSION_KEY = 'zyra-session';
const ADMIN_TOKEN_KEY = 'zyra-admin-token';

export function setAdminToken(token) {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function setTokens({ access_token, refresh_token, session_token } = {}) {
  if (access_token) localStorage.setItem(TOKEN_KEY, access_token);
  if (refresh_token) localStorage.setItem(REFRESH_KEY, refresh_token);
  if (session_token) localStorage.setItem(SESSION_KEY, session_token);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(SESSION_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function authHeaders(extra = {}) {
  const token = getToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
}

// Called when the session is truly over (refresh failed / 5-day cap hit).
// The app sets this so it can clear user state and redirect to /login.
let onSessionExpired = () => {};
export function setOnSessionExpired(fn) {
  onSessionExpired = fn;
}

// De-duplicate concurrent refreshes into a single in-flight request.
let refreshPromise = null;
async function refreshAccessToken() {
  const refresh_token = localStorage.getItem(REFRESH_KEY);
  const session_token = localStorage.getItem(SESSION_KEY);
  if (!refresh_token) return false;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token, session_token }),
        });
        if (!res.ok) return false;
        const data = await res.json().catch(() => ({}));
        if (!data.access_token) return false;
        setTokens(data);
        return true;
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

const isAuthPath = (path) =>
  path.startsWith('/api/auth/login') ||
  path.startsWith('/api/auth/refresh') ||
  path.startsWith('/api/auth/signup');

async function request(method, path, body, _retried = false) {
  const options = {
    method,
    credentials: 'include',
    headers: authHeaders(body ? { 'Content-Type': 'application/json' } : {}),
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);

  if (res.status === 401 && !_retried && !isAuthPath(path)) {
    if (await refreshAccessToken()) return request(method, path, body, true);
    clearTokens();
    onSessionExpired();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function uploadFile(path, formData, _retried = false) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: authHeaders(),
    body: formData,
  });

  if (res.status === 401 && !_retried) {
    if (await refreshAccessToken()) return uploadFile(path, formData, true);
    clearTokens();
    onSessionExpired();
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function adminRequest(method, path, body) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  const options = {
    method,
    credentials: 'include',
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}/api/admin${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

const buildQuery = (params = {}) => {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') qs.append(key, value);
  }
  const str = qs.toString();
  return str ? `?${str}` : '';
};

export const adminApi = {
  getStats: () => adminRequest('GET', '/stats'),
  getAnalytics: () => adminRequest('GET', '/analytics'),
  getUsers: (params) => adminRequest('GET', `/users${buildQuery(params)}`),
  suspendUser: (id) => adminRequest('PUT', `/users/${encodeURIComponent(id)}/suspend`),
  activateUser: (id) => adminRequest('PUT', `/users/${encodeURIComponent(id)}/activate`),
  getCampaigns: (params) => adminRequest('GET', `/campaigns${buildQuery(params)}`),
  getCampaign: (id) => adminRequest('GET', `/campaigns/${encodeURIComponent(id)}`),
  approveCampaign: (id) => adminRequest('PUT', `/campaigns/${encodeURIComponent(id)}/approve`),
  rejectCampaign: (id) => adminRequest('PUT', `/campaigns/${encodeURIComponent(id)}/reject`),
  getFlags: (filter) => adminRequest('GET', `/flags${buildQuery({ filter })}`),
  resolveFlag: (id) => adminRequest('PUT', `/flags/${encodeURIComponent(id)}/resolve`),
  dismissFlag: (id) => adminRequest('DELETE', `/flags/${encodeURIComponent(id)}`),
  getSettings: () => adminRequest('GET', '/settings'),
  updateSettings: (payload) => adminRequest('PUT', '/settings', payload),
};

export default {
  getUser: () => request('GET', '/api/auth/me'),
  signup: (name, email, password, confirmPassword) => request('POST', '/api/auth/signup', { name, email, password, confirmPassword }),
  login: async (email, password) => {
    const res = await request('POST', '/api/auth/login', { email, password });
    setTokens(res.data);
    return res;
  },
  logout: async () => {
    try {
      return await request('POST', '/api/auth/logout');
    } finally {
      clearTokens();
    }
  },
  createCampaign: (payload) => request('POST', '/api/campaigns/create', payload),
  getCampaignStats: () => request('GET', '/api/campaigns/stats'),
  getMyCampaigns: ({ limit = 4, offset = 0 } = {}) =>
    request('GET', `/api/campaigns/mine?limit=${limit}&offset=${offset}`),
  getCampaign: (id) => request('GET', `/api/campaigns/${encodeURIComponent(id)}`),
  deleteCampaign: (id) => request('DELETE', `/api/campaigns/${encodeURIComponent(id)}`),
  getProfile: () => request('GET', '/api/profile'),
  saveProfile: (payload) => request('PUT', '/api/profile', payload),
  uploadCampaignCover: (campaignId, file) => {
    const formData = new FormData();
    formData.append('cover', file);
    return uploadFile(`/api/campaigns/${campaignId}/cover`, formData);
  },
  getTransactions: ({ limit = 10, offset = 0 } = {}) => request('GET', `/api/transactions?limit=${limit}&offset=${offset}`),
  getSettings: () => request('GET', '/api/settings'),
  updateSettings: (payload) => request('PUT', '/api/settings', payload),
  changePassword: (current_password, new_password) => request('POST', '/api/settings/change-password', { current_password, new_password }),
  uploadCampaignDocuments: (campaignId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('documents', file));
    return uploadFile(`/api/campaigns/${campaignId}/documents`, formData);
  },
  // Public endpoint — fetches approved campaigns for the public campaigns page
  getPublicCampaigns: ({ limit = 20, offset = 0 } = {}) =>
    request('GET', `/api/campaigns/public?limit=${limit}&offset=${offset}`),
};