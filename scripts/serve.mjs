import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const host = "127.0.0.1";
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function resolveRequestPath(urlPath) {
  const safePath = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = safePath === "/" ? "/index.html" : safePath;
  return path.normalize(normalized).replace(/^(\.\.[\\/])+/, "");
}

async function readResponseFile(urlPath) {
  const requestPath = resolveRequestPath(urlPath);
  let filePath = path.join(distDir, requestPath);

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
  } catch {
    if (!path.extname(filePath)) {
      filePath = path.join(filePath, "index.html");
    }
  }

  const data = await fs.readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  return {
    data,
    filePath,
    type: contentTypes[ext] || "application/octet-stream",
  };
}

const server = http.createServer(async (req, res) => {
  try {
    const { data, type } = await readResponseFile(req.url || "/");
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

server.listen(port, host, () => {
  console.log(`Serving dist at http://${host}:${port}`);
});
