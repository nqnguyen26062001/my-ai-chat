"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const User = await prisma.user.findMany();
    console.log(User);
    main()
        .catch(async (e) => {
        console.error(e.message);
    });
}
