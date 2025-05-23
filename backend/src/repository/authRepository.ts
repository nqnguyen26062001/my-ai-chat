import { CreatedAt, UpdatedAt } from "sequelize-typescript";
import {Chat} from "../model/Chat"
import { User } from "../model/User";
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

interface IAuthRepository {
    login(user: loginDTo):Promise<User>;
}

export class AuthRepository implements IAuthRepository {
    async login(user: loginDTo):Promise<User> {
        try{
            if (user.userNameOrEmail !== "")
                 return  new User();
            const userLogin = await User.findOne({ where: {
                [Op.or]: [
                  { username: user.userNameOrEmail },
                  { email: user.userNameOrEmail }
                ]
              }})
            const isPasswordValid = bcrypt.compareSync(user.password, userLogin?.password || "");
            if (!isPasswordValid) return new User();
            return new User ;
        }catch(error){
            throw new Error("Method not implemented.");
        }
    }
    
}