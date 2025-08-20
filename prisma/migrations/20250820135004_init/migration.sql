-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('positive', 'negative');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "sentiment" "Sentiment" NOT NULL DEFAULT 'positive';
