const Router = require("express").Router;
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getTaskById,
} = require("../controllers/task.controllers.cjs");
const { validateRequestBody } = require("../middlewares/validate.middlewares.cjs");
const router = new Router();

// Define your routes here
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateRequestBody, addTask);
router.put("/tasks/:id", validateRequestBody, updateTask);
router.delete("/tasks/:id", deleteTask);

// Export the router
module.exports = router;
