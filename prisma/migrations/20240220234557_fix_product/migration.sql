-- AddForeignKey
ALTER TABLE "Vente_logs" ADD CONSTRAINT "Vente_logs_vendur_id_fkey" FOREIGN KEY ("vendur_id") REFERENCES "Vendur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
