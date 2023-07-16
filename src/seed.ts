import Bet from "./models/bet";
import User from "./models/user";

const usersData = [
  { id: 1, name: 'John Doe', balance: 1000.0 },
  { id: 2, name: 'Jane Smith', balance: 2000.0 },
  // Add more user data as needed
];

export async function seed() {
  try {
    await User.bulkCreate(usersData, {updateOnDuplicate: ['balance']});
    await Bet.truncate();
    console.log('User table seeded successfully');
  } catch (error) {
    console.error('Error seeding User table:', error);
  }
}