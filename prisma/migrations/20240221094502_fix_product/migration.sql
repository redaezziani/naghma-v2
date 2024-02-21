-- AddForeignKey
ALTER TABLE "produit_sell" ADD CONSTRAINT "produit_sell_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit_Final"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produit_sell" ADD CONSTRAINT "produit_sell_vendur_id_fkey" FOREIGN KEY ("vendur_id") REFERENCES "Vendur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prix_a_paye" ADD CONSTRAINT "prix_a_paye_vendur_id_fkey" FOREIGN KEY ("vendur_id") REFERENCES "Vendur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loss" ADD CONSTRAINT "loss_vendur_id_fkey" FOREIGN KEY ("vendur_id") REFERENCES "Vendur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
