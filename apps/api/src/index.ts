import "dotenv/config";
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { fileURLToPath } from "node:url";

export const getPort = (envPort = process.env.PORT) => Number(envPort ?? 4000);

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const method = req.method ?? "GET";
    const path = req.url ?? "/";
    console.log(
      `${method} ${path} ${res.statusCode} in ${durationMs.toFixed(0)}ms`,
    );
  });

  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      name: "api",
      status: "ok",
      method: req.method,
      url: req.url,
    }),
  );
};

export const createApiServer = () => createServer(requestHandler);

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

/* v8 ignore next 7 */
if (isMainModule) {
  const port = getPort();
  const server = createApiServer();
  server.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}
