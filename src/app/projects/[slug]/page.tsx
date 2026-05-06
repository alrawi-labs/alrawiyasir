import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectDetailLayout from "@/components/projects/ProjectDetailLayout";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { images: [project.image] },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetailLayout project={project} isModal={false} />;
}