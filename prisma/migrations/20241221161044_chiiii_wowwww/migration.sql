-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_createdById_fkey";

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("clerkid") ON DELETE RESTRICT ON UPDATE CASCADE;
