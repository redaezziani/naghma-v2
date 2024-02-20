/*
  Warnings:

  - You are about to drop the column `prix_a_paye` on the `Vente_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vente_logs" DROP COLUMN "prix_a_paye";

-- CreateTable
CREATE TABLE "produit_sell" (
    "id" VARCHAR(36) NOT NULL,
    "produit_id" TEXT NOT NULL,
    "vendur_id" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produit_sell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prix_a_paye" (
    "id" VARCHAR(36) NOT NULL,
    "vendur_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prix_a_paye_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frais_de_prix" (
    "id" VARCHAR(36) NOT NULL,
    "vendur_id" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "frais_de_prix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loss" (
    "id" VARCHAR(36) NOT NULL,
    "vendur_id" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "produit_id" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loss_pkey" PRIMARY KEY ("id")
);
