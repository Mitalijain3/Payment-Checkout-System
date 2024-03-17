import { User } from '../model';
import { v4 as uuidv4 } from 'uuid';

const getUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ where: { email: email } });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};
const getUserById = async (id: string) => {
  try {
    return await User.findOne({ where: { userId: id } });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

const createUser = async (email: string, password: string, name: string) => {
  try {
    return await User.create({ email, password, name, userId: uuidv4() });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export { getUserByEmail, createUser, getUserById };
