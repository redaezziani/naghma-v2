/*
  Warnings:

  - Added the required column `type` to the `frais_de_prix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "frais_de_prix" ADD COLUMN     "type" TEXT NOT NULL;
