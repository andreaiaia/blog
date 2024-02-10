import type { StaticImageData } from 'next/image';
import type { StatsType } from '../types';

export type PolaroidPropsType = {
  src: string | StaticImageData;
  alt: string;
  to?: string;
  cname?: string;
};

export type GalleryPropsType = Omit<PolaroidPropsType, 'cname'>;

export type ImagePropsType = Omit<GalleryPropsType, 'to'>;

export type PostPropsType = {
  slug: string;
  title: string;
  description: string;
  date: string;
  stats: StatsType;
  postPic: string;
};
