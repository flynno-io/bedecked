import { Router } from "express"
import { getUserById, createUser, updateUser, deleteUser } from "../../controllers/user-controllers.js"

const router = Router()

// GET /users/:id - Get user by ID
router.get("/:id", getUserById)

// POST /users - Create a new user
router.post("/", createUser)

// PUT /users/:id - Update user by ID
router.put("/:id", updateUser)

// DELETE /users/:id - Delete user by ID
router.delete("/:id", deleteUser)

export { router as userRouter }
