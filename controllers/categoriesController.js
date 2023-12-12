import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
    const categories = await prisma.categories.findMany();
    res.json(categories);
}


export {
    getAllCategories
}