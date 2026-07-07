const crypto = require("crypto");

const tasks = new Map();

module.exports = {
  list: () => [...tasks.values()],
  create(title) {
    const task = { id: crypto.randomUUID(), title, status: "todo", createdAt: new Date().toISOString() };
    tasks.set(task.id, task);
    return task;
  },
  update(id, patch) {
    const task = tasks.get(id);
    if (!task) return null;
    const allowed = ["title", "status"];
    for (const key of allowed) if (key in patch) task[key] = patch[key];
    return task;
  },
  remove: (id) => tasks.delete(id),
  clear: () => tasks.clear(),
};
