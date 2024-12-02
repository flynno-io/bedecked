// src/types/models/index.d.ts

import { Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { CardFactory } from './card';
import { DeckFactory } from './deck';
import { DeckCardFactory } from './deckcard';
import { EmblemFactory } from './emblem';

// Define interfaces for the model instances
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  // Add other user properties here
}

interface CardAttributes {
  id: number;
  name: string;
  type: string;
  // Add other card properties here
}

interface DeckAttributes {
  id: number;
  name: string;
  userId: number;
  // Add other deck properties here
}

interface DeckCardAttributes {
  id: number;
  deckId: number;
  cardId: number;
  // Add other deck card properties here
}

interface EmblemAttributes {
  id: number;
  userId: number;
  emblemName: string;
  // Add other emblem properties here
}

// Define the model interfaces (they extend Sequelize Model)
interface UserModel extends Model<UserAttributes>, UserAttributes {}
interface CardModel extends Model<CardAttributes>, CardAttributes {}
interface DeckModel extends Model<DeckAttributes>, DeckAttributes {}
interface DeckCardModel extends Model<DeckCardAttributes>, DeckCardAttributes {}
interface EmblemModel extends Model<EmblemAttributes>, EmblemAttributes {}

// Declare the exports from index.js
declare module '../models/index.js' {
  export const User: UserModel;
  export const Card: CardModel;
  export const Deck: DeckModel;
  export const DeckCard: DeckCardModel;
  export const Emblem: EmblemModel;
}
