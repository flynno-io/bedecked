import { Router } from "express"
import { getUserByEmail, createUser, updateUser, deleteUser, getProfile } from "../../controllers/user-controllers.js"

const router = Router()

// GET /users/:email - Get user by ID
router.get("/:email", getUserByEmail)

router.get("/profile", getProfile)

// POST /users - Create a new user
router.post("/", createUser)

// PUT /users/:id - Update user by ID
router.put("/:id", updateUser)

// DELETE /users/:id - Delete user by ID
router.delete("/:id", deleteUser)

export { router as userRouter }
