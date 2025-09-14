const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "../../task.json");

// In-memory store
let tasks = [];

// Load tasks once at startup
const loadTasks = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    tasks = JSON.parse(data);
  } catch (err) {
    tasks = []; // fallback if file not found or corrupted
  }
};

// Save tasks to file
const saveTasks = () => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
};

// API functions
const getTasks = (req, res) => {
  // return tasks completed=true/false
  if (req.query.completed) {
    console.log(req.query.completed);
    const completed = req.query.completed === "true";
    return res.json(tasks.filter((task) => task.completed === completed));
  }
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === Number(id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
};

const addTask = (req, res) => {
  const newTask = req.body;
  // increment id based on last task id
  newTask.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  res.json({ success: true });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updatedData } : task
  );
  saveTasks();
  res.json({ success: true });
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getTaskById,
  loadTasks,
};
