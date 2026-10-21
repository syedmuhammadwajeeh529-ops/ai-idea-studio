import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ensureDirectory } from "../storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = {
  openAiKey: process.env.OPENAI_API_KEY,
  stabilityKey: process.env.STABILITY_API_KEY,
  runwayKey: process.env.RUNWAY_API_KEY,
  lumaKey: process.env.LUMA_API_KEY,
  replicateKey: process.env.REPLICATE_API_KEY
};

const providerStatus = () => {
  const configured = Object.values(env).some(Boolean);
  if (!configured) {
    return {
      ready: false,
      message:
        "No AI provider is configured. Add OPENAI_API_KEY, STABILITY_API_KEY, REPLICATE_API_KEY, or RUNWAY_API_KEY/LUMA_API_KEY to .env before generating images or video."
    };
  }

  return { ready: true, message: "AI provider configuration detected." };
};

const extractKeywords = (idea) => {
  const text = String(idea || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3);

  const unique = [...new Set(text)];
  return unique.slice(0, 8);
};

const buildPlan = (project) => {
  const keywordList = extractKeywords(project.idea || project.title || "creative concept");
  const title = project.title || "Untitled Creative Project";
  const genre = project.genre || "Adventure";

  const scenes = [
    {
      title: `${title} begins`,
      summary: `The opening scene establishes the ${genre.toLowerCase()} world and introduces the central emotional tension.`,
      narration: `The story opens with ${keywordList.join(", ") || "a vivid world"}, drawing the audience into a sense of possibility and danger.`,
      dialogue: "Narrator: Every great idea starts with a risk worth chasing.",
      visual_prompt: `Wide cinematic shot of ${keywordList[0] || "a dreamlike location"}, atmospheric lighting, dramatic composition, highly detailed, premium cinematic style.`
    },
    {
      title: "The turning point",
      summary: "The protagonist discovers the central problem and the emotional stakes become clear.",
      narration: "A decision is made, and the story begins to accelerate toward transformation.",
      dialogue: "Protagonist: If I change the plan, I change everything.",
      visual_prompt: `Medium shot of the lead character in a tense moment, expressive face, layered environment, richly lit background, ${project.style || "cinematic"}.`
    },
    {
      title: "The call to action",
      summary: "The story moves from uncertainty to momentum.",
      narration: "A new commitment is made, and progress becomes visible in every frame.",
      dialogue: "Guide: Trust the process; the vision is becoming real.",
      visual_prompt: `Action-focused composition, movement, dynamic camera angles, atmospheric environment, hero subject centered, high detail.`
    },
    {
      title: "Final transformation",
      summary: "The emotional and visual payoff delivers the story’s meaning.",
      narration: "The final scene resolves the tension and leaves the audience with a memorable emotional impression.",
      dialogue: "Narrator: What began as a dream becomes a world worth keeping.",
      visual_prompt: `Epic final shot, layered environment, emotional lighting, polished visual narrative, richly textured and vibrant.`
    }
  ];

  return {
    script: {
      title,
      genre,
      audience: project.audience || "General audience",
      style: project.style || "Cinematic",
      language: project.language || "English",
      aspect_ratio: project.aspect_ratio || "16:9",
      target_duration: project.target_duration || 90,
      overview: `A ${genre.toLowerCase()} concept based on the idea: "${project.idea || project.title}". The narrative builds momentum through conflict, transformation, and a decisive visual payoff.`
    },
    scenes
  };
};

const imageGenerationError = () => ({
  ok: false,
  providerRequired: true,
  error: "Image generation is disabled until a provider is configured. Add STABILITY_API_KEY or OPENAI_API_KEY to your environment and restart the app."
});

const videoGenerationError = () => ({
  ok: false,
  providerRequired: true,
  error: "Video generation is disabled until a provider is configured. Add RUNWAY_API_KEY or LUMA_API_KEY to your environment and restart the app."
});

export const aiProvider = {
  status: providerStatus,
  buildPlan,
  generateImage: async ({ project, scene, prompt, type }) => {
    const status = providerStatus();
    if (!status.ready) return imageGenerationError();

    const key = process.env.STABILITY_API_KEY || process.env.OPENAI_API_KEY;
    if (!key) return imageGenerationError();

    return {
      ok: true,
      provider: key.startsWith("sk-") ? "OpenAI" : "Stability",
      type,
      prompt,
      sceneTitle: scene?.title || "Scene",
      message: `Image generation request accepted for ${project.title}. Connect your provider to complete the actual render.`
    };
  },
  generateVideoClip: async ({ project, scene, prompt }) => {
    const status = providerStatus();
    if (!status.ready) return videoGenerationError();

    const key = process.env.RUNWAY_API_KEY || process.env.LUMA_API_KEY || process.env.REPLICATE_API_KEY;
    if (!key) return videoGenerationError();

    return {
      ok: true,
      provider: process.env.RUNWAY_API_KEY ? "Runway" : "Luma",
      sceneTitle: scene?.title || "Scene",
      prompt,
      message: `Video generation request accepted for ${project.title}. Connect your provider to complete the render.`
    };
  },
  assembleFinalVideo: async ({ project, scenes }) => {
    const status = providerStatus();
    if (!status.ready) return {
      ok: false,
      providerRequired: true,
      error: "Final assembly is disabled until a provider is configured for rendering and export."
    };

    return {
      ok: true,
      provider: "Configured provider",
      scenes: scenes.length,
      message: `Assembly workflow initialized for ${project.title}. Final export will be prepared once a rendering provider is configured.`
    };
  }
};

export default aiProvider;
