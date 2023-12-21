import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import jwtGenerator from "../utils/jwtGenerator.js";
import idGenerator from "../utils/idGenerator.js";
import bcrypt from "bcrypt";
import { comparePassword } from "../services/userService.js";

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    const { email } = req.body;
    const userExists = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (userExists) {
        res.status(400).json({ error: "User already exists" });
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
            res.json({ message: "User created successfully", newUser });
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

        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const passwordDecoded = await comparePassword(user.password, password);

        if (!passwordDecoded) {
            res.status(400).json({ error: "Wrong email or password" });
            return;
        }

        res.json({
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
            role: user.role,
            token: jwtGenerator(user.id)
        });

    } catch (error) {
        res.status(400).json({ error: "An error occured during authentification" });
        console.log(error);
    }
};

const profile = async (req, res) => {

    let user = { ...req.user };

    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    res.json(user);
}

const updateProfile = async (req, res) => {
    const { id, name, age, imageUrl, address, city, location, phone, profession, languages, bio, skills } = req.body;

    const user = await prisma.users.findUnique({
        where: {
            id
        }
    });

    try {

        user.name = name || user.name;
        user.age = age || user.age;
        user.imageUrl = imageUrl || user.imageUrl;
        user.address = address || user.address;
        user.city = city || user.city;
        user.location = location || user.location;
        user.phone = phone || user.phone;
        user.profession = profession || user.profession;
        user.languages = languages || user.languages;
        user.bio = bio || user.bio;
        user.skills = skills || user.skills;

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    const updatedUser = await prisma.users.update({
        where: {
            id
        },
        data: {
            ...user
        }
    });

    res.json( {message: "User updated successfully", updatedUser});
}

const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id
            }
        });
        res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    getAllUsers,
    authenticateUser,
    createUser,
    profile,
    updateProfile,
    deleteUser
}