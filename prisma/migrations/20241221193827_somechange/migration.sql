/*
  Warnings:

  - Added the required column `creatorFullName` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "creatorFullName" TEXT NOT NULL;
