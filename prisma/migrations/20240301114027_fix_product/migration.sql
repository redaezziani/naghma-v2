/*
  Warnings:

  - Added the required column `quantite` to the `total_Selles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "total_Selles" ADD COLUMN     "quantite" INTEGER NOT NULL;
