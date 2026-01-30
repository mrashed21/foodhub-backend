/*
  Warnings:

  - A unique constraint covering the columns `[invoice]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "invoice" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_invoice_key" ON "Order"("invoice");
