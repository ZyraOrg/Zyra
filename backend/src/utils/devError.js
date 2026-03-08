/**
 * Returns a response-safe error object.
 * - Always logs the real error to the server console.
 * - In development, includes the raw error detail in the response.
 * - In production, only sends the human-readable message.
 */
const devError = (res, status, userMessage, err) => {
  console.error(`[${status}] ${userMessage}`, err);

  const body = { error: userMessage };
  if (process.env.NODE_ENV !== 'production' && err) {
    body._detail = err?.message || String(err);
  }

  return res.status(status).json(body);
};

module.exports = devError;
