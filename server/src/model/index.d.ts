export interface Card {
  id: number;
  name: string;
  type_line: string;
  oracle_text: string;
  mana_cost: string;
  cmc: number;
  power: string | null;
  toughness: string | null;
  colors: string[];
  color_identity: string[];
  set: string;
  set_name: string;
  rarity: string;
  artist: string;
  // Add other properties and methods of the Card interface here
}

export interface Deck {
  id: number;
  name: string;
  format: string;
  colors: string[];
  userId: number;
  // Add other properties and methods of the Deck interface here
}

export interface DeckCard {
  deckId: number;
  cardId: number;
  quantity: number;
  // Add other properties and methods of the DeckCard interface here
}

// Export other interfaces or types as needed