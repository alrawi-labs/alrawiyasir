import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleDetailLayout from "@/components/articles/ArticleDetailLayout";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.subtitle,
    openGraph: { images: [article.coverImage] },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return <ArticleDetailLayout article={article} isModal={false} />;
}