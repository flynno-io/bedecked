// src/interfaces/ForeignNameData.tsx

export interface ForeignNameData {
  name: string;
  type: string;
  flavor: string | null;
  imageUrl: string;
  language: string;
  identifiers: {
    scryfallId: string;
    multiverseId: number;
  };
  multiverseid: number;
}