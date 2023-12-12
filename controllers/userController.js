import { PrismaClient } from '@prisma/client';
import jwtGenerator from '../helpers/jwtGenerator.js';
import idGenerator from '../helpers/idGenerator.js';

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
}

const createUser = async (req, res) => {
    const { email, password, name, address, city, languages, skills } = req.body;
    const userExists = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (userExists) {
        res.status(400).json({ error: 'User already exists' });
    } else {
        try {
            const newUser = await prisma.users.create({
                data: {
                    ...req.body,
                    token: idGenerator()
                }
            });
            res.json({ message: 'User created successfully', newUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    let user = null;

    try {
        user = await prisma.users.findUnique({
            where: {
                email
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'The credentials are not correct' });
    }

    if (!user) {
        res.status(400).json({ error: 'The credentials are not correct' });
    }

    if (user.password === password) {
        res.json({
            id: user.id,
            name: user.name,
            surname: user.surname,
            role: user.role,
            token: jwtGenerator(user.id)
        });
    } else {
        res.status(400).json({ error: 'The credentials are not correct' });
    }
}

const profile = async (req, res) => {

    let user = { ...req.user };

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    res.json(user);
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
    profile,
    updateProfile,
    deleteUser
}