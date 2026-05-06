import { getArticleBySlug } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleModal from "@/components/articles/ArticleModal";

export default function ArticleModalPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return <ArticleModal article={article} />;
}