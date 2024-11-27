import User from './user.js';
import Card from './card.js';
import Deck from './deck.js';
import DeckCard from './deckcard.js';
import Emblem from './emblem.js';
// User and Deck (one-to-many)
User.hasMany(Deck, { foreignKey: 'userId', as: 'decks' });
Deck.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Deck and Card (many-to-many)
Deck.belongsToMany(Card, { through: DeckCard, foreignKey: 'deckId' });
Card.belongsToMany(Deck, { through: DeckCard, foreignKey: 'cardId' });
//User and Emblem (one-to-one)
User.hasOne(Emblem, { foreignKey: 'userId', as: 'emblem' });
Emblem.belongsTo(Deck, { foreignKey: 'userId', as: 'user' });
export { User, Card, Deck, DeckCard, Emblem };
