-- AlterTable
ALTER TABLE "public"."Kontrak" ADD COLUMN     "jenisTerminPembayaran" TEXT,
ADD COLUMN     "jumlahTermin" INTEGER,
ADD COLUMN     "tanggalPembayaran" INTEGER,
ALTER COLUMN "terminPembayaran" DROP NOT NULL;
