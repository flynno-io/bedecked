import sequelize from "../config/connection.js"
import { UserFactory } from "./user.js"
import { EmblemFactory } from "./emblem.js"
import { CardFactory } from "./card.js"
import { DeckFactory } from "./deck.js"
import { DeckCardFactory } from "./deckcard.js"

// initialize the models
const User = UserFactory(sequelize)
const Deck = DeckFactory(sequelize)
const Card = CardFactory(sequelize)
const DeckCard = DeckCardFactory(sequelize)
const Emblem = EmblemFactory(sequelize)

// define relationships

// Decks Model --> new
Deck.hasMany(DeckCard, { foreignKey: 'deckId', as: 'cards' });
DeckCard.belongsTo(Deck, { foreignKey: 'deckId', as: 'decks' });

// DeckCard Model --> new
DeckCard.belongsTo(Card, { foreignKey: 'cardId' });
Card.hasMany(DeckCard, { foreignKey: 'cardId' });

//User and Emblem (one-to-one)
User.hasOne(Emblem, { foreignKey: "userId", as: "emblem", onDelete: 'CASCADE' })
Emblem.belongsTo(Deck, { foreignKey: "userId", as: "user" }) // FIXME: an Emblem can belong to many users but on user can only belong to one emblem

export { User, Card, Deck, DeckCard, Emblem }
