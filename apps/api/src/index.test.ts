import { afterEach, describe, expect, it, vi } from "vitest";
import { createApiServer, getPort, requestHandler } from "./index.js";

const startServer = async () => {
  const server = createApiServer();
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Server did not bind to a TCP port");
  }

  const close = async () =>
    new Promise<void>((resolve, reject) => {
      server.close((err: Error | undefined) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

  return {
    close,
    url: `http://127.0.0.1:${address.port}`,
  };
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("api server", () => {
  it("uses the provided env port value", () => {
    expect(getPort("5050")).toBe(5050);
  });

  it("falls back to 4000 when no env port is provided", () => {
    expect(getPort(undefined)).toBe(4000);
  });

  it("returns the expected JSON payload", async () => {
    const app = await startServer();

    const response = await fetch(`${app.url}/health`);
    const payload = (await response.json()) as {
      method: string;
      name: string;
      status: string;
      url: string;
    };

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(payload).toEqual({
      method: "GET",
      name: "api1",
      status: "ok",
      url: "/health",
    });

    await app.close();
  });

  it("logs method, path, status, and duration when a request finishes", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const app = await startServer();

    await fetch(`${app.url}/test`);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^GET \/test 200 in \d+ms$/)
    );

    await app.close();
  });

  it("falls back to GET and / in logs when request method and url are missing", () => {
    let finishHandler: (() => void) | undefined;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const req = { method: undefined, url: undefined } as unknown as Parameters<
      typeof requestHandler
    >[0];

    const res = {
      statusCode: 200,
      on: vi.fn((event: string, callback: () => void) => {
        if (event === "finish") {
          finishHandler = callback;
        }
      }),
      setHeader: vi.fn(),
      end: vi.fn(() => {
        finishHandler?.();
      }),
    } as unknown as Parameters<typeof requestHandler>[1];

    requestHandler(req, res);

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^GET \/ 200 in \d+ms$/)
    );
  });
});
