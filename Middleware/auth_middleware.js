const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = validate;
