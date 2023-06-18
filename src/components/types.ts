import { StaticImageData } from 'next/image';

export type StatsType = {
  [key: string]: string;
};

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

export type PostMetadataPropsType = {
  date: string;
  stats: StatsType;
  cname?: string;
};

export type DividerPropsType = {
  size: string;
  cname?: string;
};
