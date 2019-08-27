const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function checkProjectsExists(req, res, next) {
  const { id } = req.params;

  projects.forEach(project => {
    if (project.id == id) {
      return next();
    } else {
      res.status(500).json({ error: "Projeto não encontrado" });
    }
  });
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const project = { id: id, title: title, tasks: [] };
  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectsExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id == id) {
      project.title = title;
    }
  });

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  var i = 0;

  projects.forEach(project => {
    if (project.id == id) {
      projects.splice(i, 1);
    }
    i++;
  });

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.forEach(project => {
    if (project.id == id) {
      project.tasks.push(title);
    }
  });

  return res.json(projects);
});

server.listen(3000);
