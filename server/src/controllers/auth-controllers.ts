import { Request, Response } from "express"
import { User } from "../models/index.js"
import jwt from "jsonwebtoken"

// Load environment variables
import dotenv from "dotenv"
dotenv.config()

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" })
    return
  }

  // Check if user exists
  const user = await User.findOne({ where: { email } }) // get the user object from the database
  if (!user) {
    res.status(404).json({ error: "Authentication failed!" })
    return
  }

  // Check if password is valid
  const isPasswordValid = await user.checkPassword(password)
  if (!isPasswordValid) {
    res.status(401).json({ error: "Authentication failed!" })
    return
  }

  // Generate JWT token
  const secretKey = process.env.JWT_SECRET_KEY || ""
  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" })

  // Return JWT token
  res.json({ token })
  return
}