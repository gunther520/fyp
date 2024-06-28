const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ status: 400, message: "Data input error" });
  }
};

export default validateSchema;
