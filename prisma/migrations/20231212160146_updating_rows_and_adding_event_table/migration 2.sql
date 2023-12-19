-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "skills" TEXT[];

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" INTEGER,
    "languages" TEXT[],
    "image" TEXT,
    "groupId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_name_key" ON "Events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EventsToUsers_AB_unique" ON "_EventsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventsToUsers_B_index" ON "_EventsToUsers"("B");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUsers" ADD CONSTRAINT "_EventsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsToUsers" ADD CONSTRAINT "_EventsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
