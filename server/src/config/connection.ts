import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
        pool: { // set up to allow for multiple connections to concurrently download scryfall card data of up to 90,000+ cards
          max: 20, // Maximum number of connections
          min: 5,  // Minimum number of connections
          idle: 10000, // Connection idle time before releasing
        },
      }
    );

export default sequelize;
