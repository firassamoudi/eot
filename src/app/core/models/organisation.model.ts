import { Image } from './image.model';
import { EntityType } from '../enums/organisation-type.enum';

export interface Organisation {
  id: number;
  name: string;
  type: EntityType;
  description: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  address: Address;
  contact: Contact;
  social: Social;
  logo: Image[];
  icon: any;
  funding: number;
  cofounders: number;
  employees: number;
  advancement_stage: string;
  sector: string;
  founding_date: Date;
}

export interface Address {
  id: number;
  street_address: string;
  zip_code: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Contact {
  id: number;
  website: string;
  email: string;
  phone: string;
}

export interface Social {
  id: number;
  youtube?: any;
  twitter?: any;
  facebook?: any;
  instagram?: any;
  pinterest?: any;
  linkedin?: any;
}

