/*
  Warnings:

  - You are about to drop the column `bannerImageUrl` on the `SubCategory` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImageUrl` on the `SubSubCategory` table. All the data in the column will be lost.
  - Added the required column `bannerImageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `stockQuantity` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subSubCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubSubCategory" DROP CONSTRAINT "SubSubCategory_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "bannerImageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "stockQuantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "bannerImageUrl";

-- AlterTable
ALTER TABLE "SubSubCategory" DROP COLUMN "bannerImageUrl";

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSubCategory" ADD CONSTRAINT "SubSubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subSubCategoryId_fkey" FOREIGN KEY ("subSubCategoryId") REFERENCES "SubSubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
