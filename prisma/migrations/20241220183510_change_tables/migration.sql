/*
  Warnings:

  - A unique constraint covering the columns `[clerkid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkid_key" ON "User"("clerkid");
