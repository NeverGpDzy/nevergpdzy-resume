import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { render } from "jsonresume-theme-even";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const resumeEntries = [
  {
    input: "my_resume.json",
    outputs: ["index.html", "resume.html"],
  },
  {
    input: "zh-resume.json",
    outputs: ["zh/index.html", "zh-resume.html"],
  },
  {
    input: "en-resume.json",
    outputs: ["en/index.html", "en-resume.html"],
  },
];

async function resetDistDir() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
}

async function renderResume(entry) {
  const sourcePath = path.join(rootDir, entry.input);
  const sourceText = await fs.readFile(sourcePath, "utf8");
  const html = render(JSON.parse(sourceText));

  await Promise.all(
    entry.outputs.map(async (output) => {
      const targetPath = path.join(distDir, output);
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, html, "utf8");
    }),
  );
}

await resetDistDir();

if (!process.argv.includes("--clean")) {
  await Promise.all(resumeEntries.map(renderResume));
  console.log(`Built static site into ${distDir}`);
}
