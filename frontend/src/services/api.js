const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function post(path, body) {
  const url = `${BASE_URL || ""}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export default { post, signupUser, loginUser };
