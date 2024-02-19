-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "usersId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
