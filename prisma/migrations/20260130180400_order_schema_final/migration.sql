/*
  Warnings:

  - You are about to drop the column `menuId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `providerId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `menuId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('placed', 'preparing', 'ready', 'delivered', 'cancelled');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_providerId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_menuId_fkey";

-- DropIndex
DROP INDEX "Order_menuId_key";

-- DropIndex
DROP INDEX "Order_userId_key";

-- DropIndex
DROP INDEX "OrderItem_orderId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "menuId",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'placed',
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "providerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "providerId",
ALTER COLUMN "menuId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
