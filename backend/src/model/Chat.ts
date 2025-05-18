import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: Chat.CHAT_TABLE_NAME,
})
export class Chat extends Model {
  public static CHAT_TABLE_NAME = "messages" as string;
  public static CHAT_ID = "id" as string;
  public static CHAT_USERMESSAGE = "user_message" as string;
  public static CHAT_TIMESTAMP = "timestamp" as string;
  public static CHAT_AIRESPONSE = "ai_response" as string;


  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Chat.CHAT_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(500),
    field: Chat.CHAT_USERMESSAGE,
  })
  user_message!: string;

  @Column({
    type: DataType.DATE,
    field: Chat.CHAT_TIMESTAMP,
  })
  timestamp!: Date;

  @Column({
    type: DataType.STRING(500),
    field: Chat.CHAT_AIRESPONSE,
  })
  ai_response!: string;

 
}
