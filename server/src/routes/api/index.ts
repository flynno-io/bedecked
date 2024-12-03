import { Router } from 'express'
import { userRouter } from './user-routes.js'
import { cardRouter } from './card-routes.js'
import { deckRouter } from './deck-routes.js'
import { generateDeckRouter } from '../../controllers/deck-generator-controllers.js'

const router = Router()

// Define API Routes for router
router.use('/users', userRouter )
router.use('/cards', cardRouter )
router.use('/decks', deckRouter )

export default router
