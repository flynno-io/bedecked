import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// define the interface for the JWT payload
interface JwtPayload {
	username: string
	email: string
}

// *** Extend the Request interface to include the user information to avoid TypeScript errors ***
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload
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
		jwt.verify(token, secretKey, (err, user) => {
			if (err) {
				res.sendStatus(403)
				return
			}

      // Attach the user information to the request object
      req.user = user as JwtPayload
      
			// Call the next middleware function
			next()
      return
		})
	} else {
    res.sendStatus(401) // Send unauthorized status if no authorization header is present
  }
}
