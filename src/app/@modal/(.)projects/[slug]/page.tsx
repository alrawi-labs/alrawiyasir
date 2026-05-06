import { getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectModal from "@/components/projects/ProjectModal";

export default function ProjectModalPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectModal project={project} />;
}