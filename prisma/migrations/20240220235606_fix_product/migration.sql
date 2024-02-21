-- AddForeignKey
ALTER TABLE "Vente_logs" ADD CONSTRAINT "Vente_logs_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit_Final"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
