import { Router } from "express"
import { getUserByEmail, getUserTheme, createUser, updateUser, deleteUser, getProfile } from "../../controllers/user-controllers.js"

const router = Router()

// *** Root route is /api/users ***

// GET /users/:email - Get user by ID
router.get("/:email", getUserByEmail)

//GET /users/:theme - Get user theme
router.get("/:theme", getUserTheme)

// GET /users/profile - Get user profile using JWT token
router.get("/profile", getProfile)

// POST /users - Create a new user
router.post("/", createUser)

// PUT /users/:id - Update user by ID
router.put("/:id", updateUser)

// DELETE /users/:id - Delete user by ID
router.delete("/:id", deleteUser)

export { router as userRouter }
