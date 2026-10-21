import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectory = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const getStoragePath = (folder) => {
  const target = path.join(__dirname, "storage", folder);
  ensureDirectory(target);
  return target;
};

const saveAsset = (folder, fileName, buffer) => {
  const dir = getStoragePath(folder);
  const targetPath = path.join(dir, fileName);
  fs.writeFileSync(targetPath, buffer);
  return targetPath;
};

const readJson = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
};

export { ensureDirectory, getStoragePath, saveAsset, readJson };
