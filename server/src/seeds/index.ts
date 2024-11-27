import sequelize from '../config/connection.js';
import { seedUsers } from './user-seeds.js';
import { seedCards } from './card-seeds.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true }); // force: true will drop and recreate all tables on every sync

    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedCards();
    console.log('\n----- CARDS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
