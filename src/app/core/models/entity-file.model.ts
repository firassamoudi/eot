export interface EntityFile {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width?: any;
  height?: any;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  created_at: Date;
  updated_at: Date;
}
