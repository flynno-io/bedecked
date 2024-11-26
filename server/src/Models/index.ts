import sequelize from "../config/connection.js"
import User from './user.js';
import Emblem from './emblem.js';
import { CardFactory } from './card.js';
import { DeckFactory } from "./deck.js";
import DeckCard from './deckcard.js';

// initialize the models
const Card = CardFactory(sequelize);
const Deck = DeckFactory(sequelize);


// User and Deck (one-to-many)
User.hasMany(Deck, { foreignKey: 'userId', as: 'decks' });
Deck.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Deck and Card (many-to-many)
Deck.belongsToMany(Card, { through: DeckCard, foreignKey: 'deckId' });
Card.belongsToMany(Deck, { through: DeckCard, foreignKey: 'cardId' });

//User and Emblem (one-to-one)
User.hasOne(Emblem, { foreignKey: 'userId', as: 'emblem' });
Emblem.belongsTo(Deck, { foreignKey: 'userId', as: 'user'}); // FIXME: an Emblem can belong to many users but on user can only belong to one emblem

export { User, Card, Deck, DeckCard, Emblem };