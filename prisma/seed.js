import { PrismaClient } from "@prisma/client";
import { v4 as generateUUID } from "uuid";
import { users } from "./seedData/users.js";
import { categories } from "./seedData/categories.js";
import { events } from "./seedData/events.js";

const prisma = new PrismaClient();

export const main = async () => {
    try {
        // generate users with id
        const usersWithId = users.map(user => ({
            id: generateUUID(),
            ...user,
        }));
        await prisma.users.createMany({
            data: usersWithId,
        });

        // generate categories with id 
        const categoriesWithId = categories.map(category => ({
            id: generateUUID(),
            ...category,
        }));
        await prisma.categories.createMany({
            data: categoriesWithId,
        });

        // generate events with id 
        const eventsWithId = await Promise.all(events.map(async event => {
            const { category, ...eventData } = event;

            const categoryId = await prisma.categories.findFirst({
                where: { label: category },
                select: { id: true },
            });

            return {
                id: generateUUID(),
                categoryId: categoryId.id,
                ...eventData,
            };
        }));

        console.log(eventsWithId);
        await prisma.events.createMany({
            data: eventsWithId
        });
    } catch (error) {
        console.error(error)
    };
};

main();