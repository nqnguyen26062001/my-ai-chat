"use strict";
// // src/chatbot.ts
// import { ChatOpenAI } from '@langchain/openai'; // Hoặc ChatGoogleGenerativeAI cho Gemini
// import { ConversationChain } from 'langchain/chains';
// import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
// import { BufferMemory } from 'langchain/memory'; // Sẽ thay bằng PrismaMemory
// import { PrismaClient } from '@prisma/client'; // Đảm bảo đúng đường dẫn tới PrismaClient
// import { PrismaChatMessageHistory } from '@langchain/community/stores/chat_history';
// import prisma from './prisma'; // Import Prisma client của bạn
// // Khởi tạo LLM
// const model = new ChatOpenAI({
//   temperature: 0.7, // Độ sáng tạo của AI (0-1)
//   model: "gpt-3.5-turbo", // Hoặc "gemini-pro" nếu dùng Google
//   // api_key: process.env.OPENAI_API_KEY // Tự động lấy từ biến môi trường
// });
// interface ChatbotOptions {
//   userId: string;
//   chatId?: string; // ID cuộc trò chuyện nếu đã tồn tại
//   username?: string; // Để tiện hiển thị
// }
// export async function runChatbot(options: ChatbotOptions) {
//   const { userId, chatId, username } = options;
//   let currentChatId = chatId;
//   if (!currentChatId) {
//     // Nếu chưa có chatId, tạo một cuộc trò chuyện mới
//     const newChat = await prisma.chat.create({
//       data: {
//         userId: userId,
//         title: `Chat with ${username || 'User'} - ${new Date().toLocaleDateString()}`,
//       },
//     });
//     currentChatId = newChat.id;
//     console.log(`New chat created with ID: ${currentChatId}`);
//   }
//   if (!currentChatId) {
//     throw new Error("Failed to get or create chat ID.");
//   }
//   // Khởi tạo bộ nhớ sử dụng Prisma
//   const memory = new BufferMemory({
//     chatHistory: new PrismaChatMessageHistory({
//       prisma: prisma, // Truyền instance PrismaClient của bạn
//       chatId: currentChatId,
//       model: prisma.chatMessage, // Truyền model ChatMessage của bạn
//       userModel: prisma.user, // Tùy chọn, nếu bạn cần liên kết người dùng
//       userModelIdField: 'id', // Trường ID của user model
//     }),
//     returnMessages: true, // Trả về MessagesPlaceholder trong prompt
//     memoryKey: "chat_history", // Tên biến chứa lịch sử chat trong prompt
//   });
//   const chatPrompt = ChatPromptTemplate.fromMessages([
//     ["system", "Bạn là một trợ lý chatbot thân thiện và hữu ích. Hãy trả lời các câu hỏi của người dùng."],
//     new MessagesPlaceholder("chat_history"), // Đặt lịch sử trò chuyện vào đây
//     ["human", "{input}"], // Câu hỏi hiện tại của người dùng
//   ]);
//   const chain = new ConversationChain({
//     llm: model,
//     prompt: chatPrompt,
//     memory: memory,
//   });
//   console.log(`Bắt đầu trò chuyện với ${username || 'người dùng'} (Chat ID: ${currentChatId}).`);
//   // Ví dụ tương tác
//   console.log("--------------------");
//   let response = await chain.call({ input: "Chào bạn, bạn có thể giúp gì cho tôi?" });
//   console.log("AI:", response.response);
//   console.log("--------------------");
//   response = await chain.call({ input: "Tôi muốn tìm hiểu về các dòng điện thoại mới nhất." });
//   console.log("AI:", response.response);
//   console.log("--------------------");
//   response = await chain.call({ input: "Cảm ơn, bạn rất hữu ích!" });
//   console.log("AI:", response.response);
//   console.log("\nLịch sử trò chuyện đã được lưu vào database qua Prisma.");
//   return {
//     chatId: currentChatId,
//     lastResponse: response.response,
//   };
// }
// // --- Ví dụ sử dụng (có thể đặt trong một file index.ts hoặc app.ts) ---
// async function main() {
//     try {
//         // Tạo một người dùng giả định để test
//         let user = await prisma.user.findUnique({ where: { username: 'testuser' } });
//         if (!user) {
//             user = await prisma.user.create({
//                 data: {
//                     username: 'testuser',
//                     email: 'test@example.com'
//                 }
//             });
//             console.log("Created new user:", user.username);
//         } else {
//             console.log("Using existing user:", user.username);
//         }
//         // Chạy chatbot
//         const result = await runChatbot({ userId: user.id, username: user.username });
//         console.log("Chatbot finished. Last response:", result.lastResponse);
//         // Kiểm tra lịch sử chat trong DB
//         const messages = await prisma.chatMessage.findMany({
//             where: { chatId: result.chatId },
//             orderBy: { createdAt: 'asc' },
//         });
//         console.log("\nMessages from DB:");
//         messages.forEach(msg => console.log(`${msg.sender}: ${msg.content}`));
//     } catch (error) {
//         console.error("Error running chatbot:", error);
//     } finally {
//         await prisma.$disconnect(); // Đóng kết nối Prisma
//     }
// }
// main();
