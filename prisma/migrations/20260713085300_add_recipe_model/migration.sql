/*
  Warnings:

  - You are about to drop the column `mealName` on the `ShoppingList` table. All the data in the column will be lost.
  - Added the required column `recipeId` to the `ShoppingList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "mealName",
ADD COLUMN     "recipeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cuisine" TEXT,
    "servings" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_name_key" ON "RecipeIngredient"("recipeId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_recipeId_order_key" ON "RecipeStep"("recipeId", "order");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
