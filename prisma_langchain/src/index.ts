import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // const User  = await prisma.user.create({
    //     data: {  username: 'nguyennq' , email : 'nguyennq@gmail.com' , createdAt : new Date() , updatedAt : new Date() }});
    const User = await prisma.user.findMany();
    console.log(User);
}
main()
    .catch(async (e) => {
        console.error(e.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
    ;

