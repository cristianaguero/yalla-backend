/*
  Warnings:

  - You are about to drop the column `groupId` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupsToUsers" DROP CONSTRAINT "_GroupsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupsToUsers" DROP CONSTRAINT "_GroupsToUsers_B_fkey";

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "groupId";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "_GroupsToUsers";
