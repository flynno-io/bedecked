// src/interfaces/FiltersData.tsx

export interface FiltersData {
  name?: string; // name of the card
  layout?: string; // card layout e.g. normal, split, flip, transform, etc.
  cmc?: string; // converted mana cost e.g. 1.0, 2.0, 3.0, etc.
  colors?: string; // card colors e.g. "R", "G", "B", "U", "W". Can consist of multiple colors e.g. "R,G" (AND) or "R|G" (OR)
  colorIdentity?: string; // card color identity e.g. "R", "G", "B", "U", "W". Can consist of multiple colors e.g. "R,G" (AND) or "R|G" (OR)
  type?: string; // card type e.g. "Creature — Human Cleric", "Artifact Creature — Gnome", "Enchantment — Aura", etc.
  supertypes?: string; // card supertypes e.g. "Legendary", "Snow", "Basic", "World", "Ongoing"
  types?: string; // card types e.g. "Creature", "Artifact", "Enchantment", "Instant", "Sorcery", "Planeswalker", "Land", etc.
  subtypes?: string; // card subtypes e.g. "Human", "Cleric", "Gnome", "Aura", etc.
  rarity?: string; // card rarity e.g. "Common", "Uncommon", "Rare", "Mythic Rare"
  set?: string; // set code e.g. "ELD", "M20", "WAR", etc.
  setName?: string; // the set the card belongs to e.g. "Throne of Eldraine", "Core Set 2020", "War of the Spark", etc.
  text?: string; // card text e.g. "Flying", "First strike", "Trample", "Deathtouch", etc.
  flavor?: string; // card flavor text
  artist?: string; // card artist
  number?: string; // card number
  power?: string; // power of the card e.g. 1, 2, 3, etc.
  toughness?: string; // toughness of the card e.g. 1, 2, 3, etc.
  loyalty?: string; // loyalty of the card e.g. 1, 2, 3, etc.
  language?: string; // card language - uses the name of the ForeignName object e.g. "English", "German", "Spanish", etc.
  gameFormat?: string; // game format e.g. "Standard", "Modern", "Legacy", "Vintage", "Commander", etc.
  legality?: string; // card legality e.g. "Legal", "Banned", "Restricted" - default is 'Legal'
  page?: number; // the page of data to request
  pageSize?: number; // the amount of data to request - max is 100
  orderBy?: string; // the field to order by in the results
  random?: boolean; // if true, will return a random card
  sortOrder?: string;
}