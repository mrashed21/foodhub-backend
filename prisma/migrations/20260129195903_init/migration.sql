/*
  Warnings:

  - You are about to drop the column `category` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `category_image` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `published_by` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `provider_name` on the `user` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedBy` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_menuId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_menuId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_providerId_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_published_by_fkey";

-- DropIndex
DROP INDEX "Menu_providerId_key";

-- DropIndex
DROP INDEX "OrderItem_menuId_key";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "cuisine" TEXT[],
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "menuId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "category" DROP COLUMN "category_image",
DROP COLUMN "published_by",
ADD COLUMN     "categoryImage" TEXT,
ADD COLUMN     "publishedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "provider_name",
ADD COLUMN     "providerName" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_publishedBy_fkey" FOREIGN KEY ("publishedBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
