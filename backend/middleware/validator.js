export const validator = (schema) => {
  return (req, res, next) => {
    const errors = [];

    for (let key in schema) {
      const rules = schema[key];
      const value = req.body[key];

      if (rules.required && !value) {
        errors.push(`${key} is required`);
        continue;
      }

      if (rules.type && typeof value !== rules.type) {
        errors.push(`${key} must be ${rules.type}`);
      }

      if (rules.min && value < rules.min) {
        errors.push(`${key} must be >= ${rules.min}`);
      }
    }

    if (errors.length) {
      return res.status(400).json({ 
        success: false,
        errors
      });
    }

    next();
  };
};
