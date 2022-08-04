import { Image } from './image.model';

export interface Voyage {
  id: number;
  description: string;
  title: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  subTitle?: any;
  sub_title: string;
  elements: Element[];
}

export interface Element {
  id: number;
  title?: any;
  header: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  link: string;
  logo: Image;
}
