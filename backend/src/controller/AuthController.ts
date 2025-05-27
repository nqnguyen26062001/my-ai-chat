import { Request, Response } from "express";
import authRepository from '../repository/authRepository'; 
import { User } from "../model/User";
import bcrypt from 'bcrypt';
import session from 'express-session';
declare module 'express-session' {
  interface SessionData {
    userId?: number; // Add your user-related data here
  }
}

class AuthController {
  async login(req: Request, res: Response) {
    try { 
      const { userNameOrEmail, password ,expires30day} = req.body; 

      // const user = await new AuthRepository().login(userNameOrEmail, password,expires30day);
      const user = await new authRepository().findUserByUsernameOrEmail(userNameOrEmail)
      if (!user) {
          throw new Error('User not found');
        }

        // Compare password
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //   throw new Error('Invalid password');
        // }
       req.session.userId = user.userId;

      res.status(201).json({
        message: "Login successful!",
        result : req.session
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
   async logout(req: Request, res: Response) {
    try { 
      const { userNameOrEmail, password ,expires30day} = req.body; 

      // const user = await new AuthRepository().login(userNameOrEmail, password,expires30day);
      const user = await new authRepository().findUserByUsernameOrEmail(userNameOrEmail)
      if (!user) {
          throw new Error('User not found');
        }

        // Compare password
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //   throw new Error('Invalid password');
        // }
       req.session.userId = user.userId;

      res.status(201).json({
        message: "Login successful!",
        result : req.session
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new AuthController()
