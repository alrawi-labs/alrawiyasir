import fs from "fs";
import path from "path";
import { Article } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/articles");

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const data = JSON.parse(raw) as Article;
      data.slug = file.replace(".json", "");
      return data;
    })
    .sort((a, b) => a.id - b.id);
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as Article;
  data.slug = slug;
  return data;
}