import { PrismaClient } from '@prisma/client'
import { categories, groups, users } from './seedData'

const prisma = new PrismaClient()

const main = async () => {

    try {
        await prisma.categories.createMany({
            data: categories
        })
        await prisma.groups.createMany({
            data: groups
        })
        await prisma.users.createMany({
            data: users
        })
    } catch (error) {
        console.error(error)
    }

}
main()