-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cookTimeMinutes" INTEGER,
ADD COLUMN     "difficulty" "Difficulty";
