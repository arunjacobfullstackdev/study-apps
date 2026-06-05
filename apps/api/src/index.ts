import "dotenv/config";
import { createServer, IncomingMessage } from "node:http";

const port = Number(process.env.PORT ?? 4000);

const server = createServer((req: IncomingMessage, res) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const method = req.method ?? "GET";
    const path = req.url ?? "/";
    console.log(`${method} ${path} ${res.statusCode} in ${durationMs.toFixed(0)}ms`);
  });

  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      name: "api1",
      status: "ok",
      method: req.method,
      url: req.url,
    }),
  );
});

server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
