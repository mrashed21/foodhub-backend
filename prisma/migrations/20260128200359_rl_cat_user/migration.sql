/*
  Warnings:

  - Made the column `published_by` on table `category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "published_by" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_published_by_fkey" FOREIGN KEY ("published_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
