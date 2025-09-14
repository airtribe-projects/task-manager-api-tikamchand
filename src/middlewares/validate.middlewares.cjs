const validateRequestBody = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string." });
  }

  if (typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({
      error: "Description is required and must be a non-empty string.",
    });
  }
  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "Completed must be a boolean value." });
  }

  next();
};

module.exports = { validateRequestBody };
