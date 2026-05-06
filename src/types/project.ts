export type TextBlock = {
  type: 0;
  heading: string;
  subheading?: string;
  content: string;
};

export type ImageBlock = {
  type: 1;
  heading: string;
  imageUrl: string;
  caption?: string;
};

export type VideoBlock = {
  type: 2;
  heading: string;
  videoUrl: string;
  posterUrl?: string;
  caption?: string;
};

export type GalleryBlock = {
  type: 3;
  heading: string;
  images: { url: string; alt: string; caption?: string }[];
};

export type CodeBlock = {
  type: 4;
  heading: string;
  codeBlocks: { language: string; label: string; code: string }[];
  defaultTab?: number;
};

export interface PdfBlock {
  type: 5;
  heading: string;
  pdfUrl: string;
  caption?: string;
}

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | VideoBlock
  | PdfBlock
  | GalleryBlock
  | CodeBlock;

export type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  isFeatured: boolean;
  description: string;
  longDescription: string;
  category: string[];
  tags: string[];
  image: string;
  techLogos: string[];
  date: string;
  duration: string;
  teamSize: number;
  role: string;
  demoLink: string | null;
  githubLink: string | null;
  buy: {
    price: string;
    currency: string;
    features: string[];
    buylink: string;
  } | null;
  technologies: { name: string; description: string }[];
  contentBlocks: ContentBlock[];
  challenges: string[];
  solutions: string[];
  results: { metric: string; value: string; description: string }[];
  testimonial: { text: string; author: string; position: string } | null;
};