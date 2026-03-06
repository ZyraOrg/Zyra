const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(method, path, body) {
  const options = {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : {},
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data?.error || data?.message || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

async function uploadFile(path, formData) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }
  return { data };
}

export default {
  getUser: () => request('GET', '/api/auth/me'),
  signup: (name, email, password, confirmPassword) => request('POST', '/api/auth/signup', { name, email, password, confirmPassword }),
  login: (email, password) => request('POST', '/api/auth/login', { email, password }),
  logout: () => request('POST', '/api/auth/logout'),
  createCampaign: (payload) => request('POST', '/api/campaigns/create', payload),
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
  uploadCampaignDocuments: (campaignId, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('documents', file));
    return uploadFile(`/api/campaigns/${campaignId}/documents`, formData);
  },
};
