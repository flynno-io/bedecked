import { Router } from "express"
import { login } from "../controllers/auth-controllers.js"

const router = Router()

// POST /login - Login user
router.post("/login", login)

export default router