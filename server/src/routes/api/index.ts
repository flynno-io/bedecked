import { Router } from 'express'

const router = Router()

// Define API Routes for router
router.use('/users', userRouter )
router.use('/cards', cardRouter )
router.use('/decks', deckRouter )

export default router