/*
  Warnings:

  - You are about to drop the `FinalProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrimaryProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FinalProduct";

-- DropTable
DROP TABLE "PrimaryProduct";

-- CreateTable
CREATE TABLE "Matiere_Premiere" (
    "id" VARCHAR(36) NOT NULL,
    "nom" TEXT NOT NULL,
    "prix_achat" DOUBLE PRECISION NOT NULL,
    "quantite" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matiere_Premiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit_Final" (
    "id" VARCHAR(36) NOT NULL,
    "nom" TEXT NOT NULL,
    "prix_vente" DOUBLE PRECISION NOT NULL,
    "quantite" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_Final_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendur" (
    "id" VARCHAR(36) NOT NULL,
    "nom" TEXT NOT NULL,
    "le_prix_a_payer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "le_prix_a_paye" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "frais_de_prix" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matiere_Premiere_logs" (
    "id" VARCHAR(36) NOT NULL,
    "stock_initial" INTEGER NOT NULL,
    "consomation" INTEGER NOT NULL,
    "achat" INTEGER NOT NULL,
    "ventes" INTEGER NOT NULL,
    "offres" INTEGER NOT NULL,
    "retours" INTEGER NOT NULL,
    "stock_final" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matiere_Premiere_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit_Final_logs" (
    "id" VARCHAR(36) NOT NULL,
    "stock_initial" INTEGER NOT NULL,
    "production" INTEGER NOT NULL,
    "ventes" INTEGER NOT NULL,
    "retours" INTEGER NOT NULL,
    "changes" INTEGER NOT NULL,
    "stock_final" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_Final_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vente_logs" (
    "id" VARCHAR(36) NOT NULL,
    "vendur_id" TEXT NOT NULL,
    "produit_id" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "prix_a_paye" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vente_logs_pkey" PRIMARY KEY ("id")
);
