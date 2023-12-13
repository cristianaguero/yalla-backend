import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {

    try {
        const categories = await prisma.categories.findMany();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createCategory = async (req, res) => {

    const { label, icon, description } = req.body;

    try {
        const newCategory = await prisma.categories.create({
            data: {
                name: label,
                image: icon,
                description
            }
        });
        res.json({ message: 'Category created successfully', newCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateCategory = async (req, res) => {

    const { label, icon, description } = req.body;

    const { id } = req.params;

    const categoryExists = await prisma.categories.findUnique({
        where: {
            id
        }
    });

    if (!categoryExists) {
        res.status(400).json({ error: 'Category not found' });
    } else {

    try {
        categoryExists.name = label || categoryExists.name;
        categoryExists.image = icon || categoryExists.image;
        categoryExists.description = description || categoryExists.description;

        const updatedCategory = await prisma.categories.update({
            where: {
                id
            },
            data: {
                ...categoryExists
            }
        });
        
        res.json({ message: 'Category created successfully', updatedCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
}

const deleteCategory = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: 'Category not found' });
    } else {

    try {
        const deletedCategory = await prisma.categories.delete({
            where: {
                id
            }
        });
        res.json({ message: 'Category deleted successfully', deletedCategory });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
}

export {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}