import { Image } from './image.model';

export interface Partner {
  id: number;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  image: Image[];
}
