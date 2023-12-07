import { users } from './seedData/users'
import { groups } from './seedData/groups'
import { categories } from './seedData/categories'
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