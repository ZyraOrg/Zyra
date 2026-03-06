const { ZodError } = require('zod');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message);
    return res.status(400).json({ error: errors[0], errors });
  }

  req.body = result.data;
  next();
};

module.exports = validate;
