import { Request, Response } from "express"
import { User } from "../Models/index.js"
import omit from "lodash/omit.js"

// Get user by ID
export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
	const { email } = req.params
	try {
		const user = await User.findOne({ where: { email } })
		if (user) {
			res.json(omit(user.toJSON(), "password", "createdAt", "updatedAt"))
		} else {
			res.status(404).json({ error: "User not found" })
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
	const { username, email, password, manaTheme } = req.body
	try {
		const user = await User.create({ username, email, password, manaTheme })
		res.status(201).json(user)
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params
	const { username, email, password, manaTheme } = req.body
	try {
		const user = await User.findByPk(id)
		if (user) {
			if (username) user.username = username
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
}

// Delete user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
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
}

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const user = req.user
  res.json(user)
}

