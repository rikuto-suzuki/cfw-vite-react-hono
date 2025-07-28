import { Hono } from "hono";

type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/todos", async (c) => {
  const todos = await c.env.DB.prepare("SELECT * FROM todos").all();
  return c.json(todos);
});

app.post("/api/todos", async (c) => {
  const { title, description } = await c.req.json();

  const result = await c.env.DB.prepare(
    "INSERT INTO todos (title, description, is_done, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(title)
    .bind(description || "")
    .bind(false)
    .bind(new Date().toISOString())
    .bind(new Date().toISOString())
    .run();

  return c.json({});
});

app.put("/api/todos/:id", async (c) => {
  const id = c.req.param("id");
  const { title, description, is_done } = await c.req.json();

  const result = await c.env.DB.prepare(
    "UPDATE todos SET title = ?, description = ?, is_done = ?, updated_at = ? WHERE id = ?"
  )
    .bind(title)
    .bind(description || "")
    .bind(is_done)
    .bind(new Date().toISOString())
    .bind(id)
    .run();

  return c.json({});
});

export default app;
