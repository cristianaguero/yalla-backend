import { PrismaClient } from '@prisma/client'
import { categories, users } from './seedData'

const prisma = new PrismaClient()

const main = async () => {

    try {
        await prisma.categories.createMany({
            data: categories
        })
        await prisma.users.createMany({
            data: users
        })
    } catch (error) {
        console.error(error)
    }

}
main()