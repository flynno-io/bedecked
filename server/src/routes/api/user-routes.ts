import { Router } from "express"
import type { Request, Response } from "express"
import { User } from '../../models'

const router = Router()

// GET /users/:id - Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const user = await User.findByPk(id)
		if (user) {
			res.json(user)
		} else {
			res.status(404).json({ error: "User not found" })
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})

// POST /users - Create a new user
router.post("/", async (req: Request, res: Response) => {
	const { name, email, password, manaTheme } = req.body
	try {
		const user = await User.create({ name, email, password, manaTheme })
		res.status(201).json(user)
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})

// PUT /users/:id - Update user by ID
router.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, email, password, manaTheme } = req.body
	try {
		const user = await User.findByPk(id)
		if (user) {
			if (name) user.name = name
			if (email) user.email = email
			if (password) user.password = password
			if (manaTheme) user.manaTheme = manaTheme
			await user.save()
			res.json(user)
		} else {
			res.status(404).json({ error: "User not found" })
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})

// DELETE /users/:id - Delete user by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (user) {
      await user.destroy()
      res.status(204).end()
    } else {
      res.status(404).json({ error: "User not found" })
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export { router as userRouter }
