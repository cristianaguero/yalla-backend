import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
    const categories = await prisma.categories.findMany();
    res.json(categories);
}


export {
    getAllCategories
}