import type { ReadTimeResults } from 'reading-time';

export type StatsType = ReadTimeResults;

export type PostPropsType = {
  slug: string;
  title: string;
  description: string;
  date: string;
  stats: StatsType;
  postPic: string;
};
