import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import jwtGenerator from '../utils/jwtGenerator.js';
import idGenerator from '../utils/idGenerator.js';
import bcrypt from 'bcrypt';
import { comparePassword } from '../services/userService.js';

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
}

const createUser = async (req, res) => {
    const { email } = req.body;
    const userExists = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (userExists) {
        res.status(400).json({ error: 'User already exists' });
    } else {

        const salt = await bcrypt.genSalt(10);

        try {
            const newUser = await prisma.users.create({
                data: {
                    ...req.body,
                    token: idGenerator(),
                    password: await bcrypt.hash(req.body.password, salt)
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

    
        const passwordDecoded = await comparePassword(user.password, password)

    try {
        if (!passwordDecoded) {
            res.status(400).json({ error: 'The credentials are not correct' });
        } else {
            res.json({
                id: user.id,
                name: user.name,
                surname: user.surname,
                role: user.role,
                token: jwtGenerator(user.id)
            });
        }
    } catch (error) {
        res.status(400).json({ error: 'The credentials are not correct' })
        console.log(error);
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