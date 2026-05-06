import { ContentBlock } from "./project";


export interface SubPage {
  id: string;
  title: string;
  link?: string; // opsiyonel — varsa "Koda Bak" butonu gösterilir
  contentBlocks: ContentBlock[]; // mevcut ContentBlock tipini kullan
}

export type Article = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  link: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  illustr_01: string;
  illustr_02: string;
  contentBlocks: ContentBlock[];
  subPages?: SubPage[];
};