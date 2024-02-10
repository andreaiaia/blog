import type { ReadTimeResults } from 'reading-time';

export type Metadata = {
  title: string;
  date: string;
  description: string;
  author: string;
  tags: string[];
  pic: string;
};

export type PostData = Metadata & {
  id: string;
  tags: string[];
  stats: ReadTimeResults;
  formattedDate: string;
};

export type FullPost = {
  id: string;
  stats: ReadTimeResults;
  formattedDate: string;
  data: Metadata;
  content: string;
};
