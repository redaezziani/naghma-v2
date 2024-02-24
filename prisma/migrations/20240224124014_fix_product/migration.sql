/*
  Warnings:

  - Added the required column `produit_id` to the `Produit_Final_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produit_Final_logs" ADD COLUMN     "produit_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "retorn_logs" (
    "id" VARCHAR(36) NOT NULL,
    "vendur_id" TEXT NOT NULL,
    "produit_id" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "retorn_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Produit_Final_logs" ADD CONSTRAINT "Produit_Final_logs_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit_Final"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retorn_logs" ADD CONSTRAINT "retorn_logs_vendur_id_fkey" FOREIGN KEY ("vendur_id") REFERENCES "Vendur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retorn_logs" ADD CONSTRAINT "retorn_logs_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit_Final"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
