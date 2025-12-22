const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export default { post, signupUser, loginUser, getUser };
