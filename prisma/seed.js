import { users } from './seedData/users.js'
import { groups } from './seedData/groups.js'
import { categories } from './seedData/categories.js'
import { PrismaClient } from '@prisma/client'

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