/*
  Warnings:

  - You are about to drop the column `usersId` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_usersId_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "usersId",
ADD COLUMN     "users_Id" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_users_Id_fkey" FOREIGN KEY ("users_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
