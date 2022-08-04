import { Image } from './image.model';
import { EntityFile } from './entity-file.model';

export interface Insight {
  id: number;
  title: string;
  subTitle: string;
  price: number;
  numberVues: number;
  numberDownloads: number;
  description: string;
  bigImages: boolean;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  type: string;
  cover: Image;
  file: EntityFile;
  images: Image[];
}
