import { User } from "../models/index.js"

export const seedUsers = async (): Promise<void> => {
	try {
		await User.bulkCreate(
			[
				{
					username: "johndoe",
					email: "johndoe@example.com",
					password: "password",
					manaTheme: "theme-green",
				},
				{
					username: "janedoe",
					email: "janedoe@example.com",
					password: "password",
					manaTheme: "blue",
				},
			],
			{ individualHooks: true }
		)
	} catch (error: any) {
		console.error("Error seeding users:", error)
	}
}
