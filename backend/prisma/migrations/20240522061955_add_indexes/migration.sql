-- CreateIndex
CREATE INDEX "Account_customer_id_idx" ON "Account"("customer_id");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email" DESC);

-- CreateIndex
CREATE INDEX "DailyTotal_account_id_idx" ON "DailyTotal"("account_id");

-- CreateIndex
CREATE INDEX "DailyTotal_date_idx" ON "DailyTotal"("date");

-- CreateIndex
CREATE INDEX "Transaction_account_id_idx" ON "Transaction"("account_id");

-- CreateIndex
CREATE INDEX "Transaction_customer_id_idx" ON "Transaction"("customer_id");
