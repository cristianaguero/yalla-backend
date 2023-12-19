import { PrismaClient } from '@prisma/client'
import { categories, users, events } from './seedData'

const prisma = new PrismaClient()

const main = async () => {

    try {
        await prisma.categories.createMany({
            data: categories
        })
        await prisma.users.createMany({
            data: users
        })
        await prisma.events.createMany({
            data: events
        })
    } catch (error) {
        console.error(error)
    }

}
main()