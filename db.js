import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, "data");
const storageDir = path.join(__dirname, "storage");

fs.mkdirSync(dbDir, { recursive: true });
fs.mkdirSync(storageDir, { recursive: true });

const dbPath = path.join(dbDir, "ai_idea_studio.db");
const Database = (await import("better-sqlite3")).default;
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    idea TEXT DEFAULT '',
    genre TEXT,
    audience TEXT,
    style TEXT,
    language TEXT,
    aspect_ratio TEXT,
    target_duration INTEGER DEFAULT 60,
    status TEXT DEFAULT 'Draft',
    thumbnail TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS scenes (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    title TEXT,
    summary TEXT,
    narration TEXT,
    dialogue TEXT,
    visual_prompt TEXT,
    scene_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS versions (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    label TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS media_assets (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    scene_id TEXT,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    file_path TEXT,
    provider TEXT,
    status TEXT DEFAULT 'Draft',
    metadata TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY(scene_id) REFERENCES scenes(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS final_videos (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    title TEXT,
    file_path TEXT,
    status TEXT DEFAULT 'Draft',
    metadata TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
  );
`);

const ensureSeedProject = () => {
  const existing = db.prepare(`SELECT COUNT(*) as c FROM projects`).get();
  if (Number(existing.c) > 0) return;

  const projectId = crypto.randomUUID();
  db.prepare(
    `INSERT INTO projects (id, title, description, idea, genre, audience, style, language, aspect_ratio, target_duration, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    projectId,
    "City of Tomorrow",
    "A short cinematic concept exploring a future city shaped by memory and climate.",
    "A young architect discovers she can hear forgotten voices inside the city’s climate towers. She must rebuild the city’s memory to save it from a storm that is both literal and emotional.",
    "Sci-fi",
    "Young adults",
    "Cinematic, atmospheric",
    "English",
    "16:9",
    90,
    "Draft"
  );

  const scenes = [
    {
      title: "Opening on the towers",
      summary: "The city hums beneath a stormy sky.",
      narration: "In the city of tomorrow, memory is the last renewable energy.",
      dialogue: "Architect: The towers are still speaking.",
      visual_prompt: "A dramatic skyline, storm clouds, giant climate towers glowing at dusk, cinematic wide shot."
    },
    {
      title: "The forgotten voice",
      summary: "The protagonist hears fragments of people’s lost memories.",
      narration: "One voice cuts through the static and changes everything.",
      dialogue: "Voice: We built this city to remember. Now it is forgetting us.",
      visual_prompt: "Close-up of the architect in a rain-soaked tower, glowing holographic city maps."
    }
  ];

  scenes.forEach((scene, index) => {
    const sceneId = crypto.randomUUID();
    db.prepare(
      `INSERT INTO scenes (id, project_id, title, summary, narration, dialogue, visual_prompt, scene_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      sceneId,
      projectId,
      scene.title,
      scene.summary,
      scene.narration,
      scene.dialogue,
      scene.visual_prompt,
      index + 1
    );
  });
};

ensureSeedProject();

export { db, dbPath, storageDir };
