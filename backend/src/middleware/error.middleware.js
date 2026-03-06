const notFound = (req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${status}] ${req.method} ${req.path} — ${message}`);

  res.status(status).json({ error: message });
};

module.exports = { notFound, errorHandler };
