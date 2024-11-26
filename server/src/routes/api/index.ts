import { Router } from 'express';
import { cardRouter } from './card-routes.js';
import { deckRouter } from './deck-card.js';

const router = Router();

router.use('/cards', cardRouter);
router.use('/decks', deckRouter);

export default router;
