/*
  Warnings:

  - You are about to drop the column `users_Id` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_users_Id_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "users_Id",
ADD COLUMN     "user_Id" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
