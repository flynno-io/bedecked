import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

// define the interface for the JWT payload
interface JwtPayload {
	email: string
}

// *** Extend the Request interface to include the user information to avoid TypeScript errors ***
declare module "express-serve-static-core" {
	interface Request {
		user?: { id: number; username: string; email: string; manaTheme: string }
	}
}

// Middleware function to authenticate the JWT token
export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	// Get the authorization header
	const authHeader = req.headers.authorization

	if (authHeader) {
		// Get the token from the authorization header
		const token = authHeader.split(" ")[1]

		// Load the JWT secret key from the environment variables
		const secretKey = process.env.JWT_SECRET_KEY || ""

		// Verify the token
		jwt.verify(token, secretKey, async (err, user) => {
			if (err) {
				res.sendStatus(403)
				return
			}

      const userInfo =  await User.findOne({ where: { email: (user as JwtPayload).email } })

			// Attach the user information to the request object
			if (userInfo) {
				req.user = userInfo.toJSON()
			} else {
				res.status(404).send({ error: "error locating user" }) // Send not found status if user is not found
				return
			}

			// Call the next middleware function
			next()
			return
		})
	} else {
		res.sendStatus(401) // Send unauthorized status if no authorization header is present
	}
}
