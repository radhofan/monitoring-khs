/*
  Warnings:

  - Made the column `jenisTerminPembayaran` on table `Kontrak` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Kontrak" ALTER COLUMN "jenisTerminPembayaran" SET NOT NULL;
