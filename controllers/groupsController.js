import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllGroups = async (req, res) => {
    const groups = await prisma.groups.findMany();
    res.json(groups);
}

export {
    getAllGroups
}