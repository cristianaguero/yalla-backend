import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
}

const createUser = async (req, res) => {
    const { email, password, name, surname } = req.body;
    const userExists = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (userExists) {
        res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await prisma.users.create({
        data: {
            email,
            password,
            name,
            surname
        }
    });

    res.json(newUser);
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        res.status(400).json({ error: 'The credentials are not correct' });
    }

    if (user.password !== password) {
        res.status(400).json({ error: 'The credentials are not correct' });
    }

    res.json({
        id: user.id,
        name: user.name,
        surname: user.surname,
        role: user.role
    });
}

const updateProfile = async (req, res) => {
    const { id, name, surname, age, password, image } = req.body;

    const updatedUser = await prisma.users.update({
        where: {
            id
        },
        data: {
            name,
            surname,
            age,
            password,
            image
        }
    });

    res.json(updatedUser);
}

const deleteUser = async (req, res) => {
    const { id } = req.body;

    const deletedUser = await prisma.users.delete({
        where: {
            id
        }
    });

    res.json(deletedUser);
}

    export {
        getAllUsers,
        authenticateUser,
        createUser,
        updateProfile,
        deleteUser
    }