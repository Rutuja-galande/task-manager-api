const express = require("express");
const tasks = require("./routes/tasks");

const app = express();
app.use(express.json());
app.use("/api/tasks", tasks);

app.get("/health", (_req, res) => res.json({ ok: true }));

module.exports = app;
