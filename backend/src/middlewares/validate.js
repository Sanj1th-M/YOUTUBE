const { z } = require('zod');
const ApiError = require('../utils/ApiError');

/**
 * Validation Middleware
 * Validates request body, query, and params against a Zod schema.
 */
const validate = (schema) => (req, res, next) => {
  try {
    const validData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Replace request data with sanitized and validated data
    req.body = validData.body;
    req.query = validData.query;
    req.params = validData.params;

    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((details) => `${details.path.join('.')}: ${details.message}`).join(', ');
      return next(new ApiError(400, errorMessage));
    }
    return next(new ApiError(400, 'Invalid request data'));
  }
};

module.exports = validate;
