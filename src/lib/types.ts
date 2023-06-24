import { ReadTimeResults } from 'reading-time';

export type Metadata = {
  title: string;
  date: string;
  description: string;
  author: string;
  tag: string;
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
  tags: string[];
  stats: ReadTimeResults;
  formattedDate: string;
  data: {
    title: string;
    date: string;
    description: string;
    author: string;
    tag: string;
    pic: string;
  };
  content: string;
};
