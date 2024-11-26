// src/interfaces/cardData.tsx
import { ForeignNameData } from './ForeignNameData';
import { LegalitiesData } from './LegalitiesData';

export interface CardData {
  name: string;
  cmc: number;
  colorIdentity: string[];
  type: string;
  supertypes: string[];
  types: string[];
  subtypes: string[];
  rarity: string;
  set: string;
  setName: string;
  text: string;
  artist: string;
  number: string;
  layout: string;
  multiverseid: string;
  imageUrl: string;
  variations: string[];
  foreignNames: ForeignNameData[];
  printings: string[];
  originalText: string;
  originalType: string;
  legalities: LegalitiesData[];
  id: string;
}