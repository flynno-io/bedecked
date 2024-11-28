import sequelize from "../config/connection.js";
import { UserFactory } from "../Models/user.js";
import { EmblemFactory } from "../Models/emblem.js";
import { CardFactory } from "../Models/card.js";
import { DeckFactory } from "../Models/deck.js";
import { DeckCardFactory } from "../Models/deckcard.js";
// initialize the models
const User = UserFactory(sequelize);
const Deck = DeckFactory(sequelize);
const Card = CardFactory(sequelize);
const DeckCard = DeckCardFactory(sequelize);
const Emblem = EmblemFactory(sequelize);
// define relationships
// User and Deck (one-to-many)
User.hasMany(Deck, { foreignKey: "userId", as: "decks", onDelete: 'CASCADE' });
Deck.belongsTo(User, { foreignKey: "userId", as: "user", onDelete: 'CASCADE' });
// Deck and Card (many-to-many)
// Deck.belongsToMany(Card, { through: DeckCard, foreignKey: "deckId", onDelete: 'CASCADE' })
// Card.belongsToMany(Deck, { through: DeckCard, foreignKey: "cardId", onDelete: 'CASCADE' })
Deck.belongsToMany(Card, { through: DeckCard });
Card.belongsToMany(Deck, { through: DeckCard });
//User and Emblem (one-to-one)
User.hasOne(Emblem, { foreignKey: "userId", as: "emblem", onDelete: 'CASCADE' });
Emblem.belongsTo(Deck, { foreignKey: "userId", as: "user" }); // FIXME: an Emblem can belong to many users but on user can only belong to one emblem
export { User, Card, Deck, DeckCard, Emblem };
