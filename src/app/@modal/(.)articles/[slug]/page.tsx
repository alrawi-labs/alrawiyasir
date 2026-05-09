import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleModal from "@/components/articles/ArticleModal";

export default async function ArticleModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticleModal article={article} />;
}