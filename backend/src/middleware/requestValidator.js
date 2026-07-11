/**
 * Middleware to validate requests to the company analysis endpoint.
 * Verifies that the client provided a valid, non-empty company name.
 */
const validateAnalysisInput = (req, res, next) => {
  const { companyName } = req.body;

  if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
    return res.status(400).json({
      error: 'Company name is required and must be a valid non-empty string.',
    });
  }

  // Sanitize the input by trimming trailing and leading whitespace
  req.body.companyName = companyName.trim();
  next();
};

export default validateAnalysisInput;
