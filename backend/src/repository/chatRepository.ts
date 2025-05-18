import { CreatedAt, UpdatedAt } from "sequelize-typescript";
import {Chat} from "../model/Chat"

interface IChatRepository {
    postMessage(chat:Chat):Promise<void>;
    getMessages():Promise<Chat[]>;
}

export class ChatRepository implements IChatRepository {
    async postMessage(chat: Chat): Promise<void> {
        try{
             await Chat.create({
                user_message : chat.user_message,
                ai_response : chat.ai_response
            })
        }catch(error){
            throw new Error("Method not implemented.");
        }
    }
    async getMessages(): Promise<Chat[]> {
        try {
            return await Chat.findAll();
           } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    
}