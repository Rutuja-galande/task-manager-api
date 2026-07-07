const test = require("node:test");
const assert = require("node:assert");
const app = require("../src/app");
const store = require("../src/store");

function request(method, path, body) {
  return new Promise((resolve) => {
    const server = app.listen(0, async () => {
      const res = await fetch("http://localhost:" + server.address().port + path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = res.status === 204 ? null : await res.json();
      server.close();
      resolve({ status: res.status, data });
    });
  });
}

test("create + list + update + delete", async () => {
  store.clear();
  const created = await request("POST", "/api/tasks", { title: "Ship it" });
  assert.strictEqual(created.status, 201);

  const list = await request("GET", "/api/tasks");
  assert.strictEqual(list.data.length, 1);

  const updated = await request("PATCH", "/api/tasks/" + created.data.id, { status: "done" });
  assert.strictEqual(updated.data.status, "done");

  const del = await request("DELETE", "/api/tasks/" + created.data.id);
  assert.strictEqual(del.status, 204);
});

test("validates title", async () => {
  const res = await request("POST", "/api/tasks", {});
  assert.strictEqual(res.status, 400);
});
