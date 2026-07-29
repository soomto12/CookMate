/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PantryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PantryItem" DROP CONSTRAINT "PantryItem_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "PantryItem" DROP CONSTRAINT "PantryItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_createdById_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeStep" DROP CONSTRAINT "RecipeStep_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingListItem" DROP CONSTRAINT "ShoppingListItem_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingListItem" DROP CONSTRAINT "ShoppingListItem_shoppingListId_fkey";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "PantryItem";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "RecipeIngredient";

-- DropTable
DROP TABLE "RecipeStep";

-- DropTable
DROP TABLE "ShoppingList";

-- DropTable
DROP TABLE "ShoppingListItem";
