/*
  Warnings:

  - You are about to drop the column `account_type` on the `Account` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "account_type",
ADD COLUMN     "credit_limit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AccountType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountType_type_key" ON "AccountType"("type");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "AccountType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
