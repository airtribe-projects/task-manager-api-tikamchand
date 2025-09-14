const express = require("express");
const taskRoutes = require("./src/routes/task.routes.cjs");
const { loadTasks } = require("./src/controllers/task.controllers.cjs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", taskRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  // Load tasks when server starts
  loadTasks();
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
