const { Router } = require("express");
const store = require("../store");

const router = Router();

router.get("/", (req, res) => {
  const { status } = req.query;
  let items = store.list();
  if (status) items = items.filter((t) => t.status === status);
  res.json(items);
});

router.post("/", (req, res) => {
  const { title } = req.body ?? {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required" });
  }
  res.status(201).json(store.create(title));
});

router.patch("/:id", (req, res) => {
  const updated = store.update(req.params.id, req.body ?? {});
  if (!updated) return res.status(404).json({ error: "not found" });
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  if (!store.remove(req.params.id)) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

module.exports = router;
