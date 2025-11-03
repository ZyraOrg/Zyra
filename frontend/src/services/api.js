const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function signupUser(formData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

async function loginUser(formData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

// Default export
export default {
  signupUser,
  loginUser,
};
