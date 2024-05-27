-- CreateTable
CREATE TABLE "DailyTotal" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_deposit" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "total_withdrawal" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "total_transfer" DECIMAL(18,2) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyTotal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyTotal_account_id_date_key" ON "DailyTotal"("account_id", "date");

-- AddForeignKey
ALTER TABLE "DailyTotal" ADD CONSTRAINT "DailyTotal_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
