import { ContentBlock } from "@/types/project";
import TextBlock from "./blocks/TextBlock";
import ImageBlock from "./blocks/ImageBlock";
import VideoBlock from "./blocks/VideoBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import CodeBlock from "./blocks/CodeBlock";
import PdfBlock from "./blocks/PdfBlock";

export default function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 0: return <TextBlock block={block} />;
    case 1: return <ImageBlock block={block} />;
    case 2: return <VideoBlock block={block} />;
    case 3: return <GalleryBlock block={block} />;
    case 4: return <CodeBlock block={block} />;
    case 5: return <PdfBlock block={block} />;
  }
}