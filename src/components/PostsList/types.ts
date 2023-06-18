import { StatsType } from '../types';

export type Post = {
  id: string;
  title: string;
  description: string;
  formattedDate: string;
  stats: StatsType;
  pic: string;
};

export type Props = {
  posts: Post[];
  title?: string;
};
