import { Router } from 'express'
import { userRouter } from './user-routes'
import cardRouter from './card-routes'
import deckRouter from './deck-routes'

const router = Router()

// Define API Routes for router
router.use('/users', userRouter )
router.use('/cards', cardRouter )
router.use('/decks', deckRouter )

export default router