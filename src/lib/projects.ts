import fs from "fs";
import path from "path";
import { Project } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const data = JSON.parse(raw) as Project;
      data.slug = file.replace(".json", "");
      return data;
    })
    .sort((a, b) => a.id - b.id); 
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as Project;
  data.slug = slug;
  return data;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.isFeatured);
}