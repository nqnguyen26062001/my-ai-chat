// src/services/userService.ts
import { User } from '../model/User'; // Import the User model class itself
import { UniqueConstraintError } from 'sequelize';
import { Op } from 'sequelize'; // Import Op for Sequelize operators

interface IAuthRepository {
    findUserByUsernameOrEmail(identifier: string): Promise<User | null> ;
    findUserByUsername(username: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}
class authRepository  implements IAuthRepository {
   async findUserByUsernameOrEmail(identifier: string): Promise<User | null> {
    try {
      return await User.findOne({
        where: {
          [Op.or]: [ // Use Sequelize's OR operator
            { username: identifier },
            { email: identifier.toLowerCase() } // Always store/compare emails in lowercase
          ]
        }
      });
    } catch (error: any) {
      console.error(`Error finding user by identifier '${identifier}':`, error.message);
      throw new Error(`Failed to find user by identifier: ${error.message}`);
    }
  }

   async findUserByUsername(username: string): Promise<User | null> {
    try {
      return await User.findOne({
        where: { username: username }
      });
    } catch (error: any) {
      console.error(`Error finding user by username '${username}':`, error.message);
      throw new Error(`Failed to find user by username: ${error.message}`);
    }
  }

   async findUserByEmail(email: string): Promise<User | null> {
    try {
      return User.findOne({
        where: { email: email.toLowerCase() }
      });
    } catch (error: any) {
      console.error(`Error finding user by email '${email}':`, error.message);
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }
}

export default authRepository;