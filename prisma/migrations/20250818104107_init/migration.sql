-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bidang" TEXT NOT NULL,
    "subBidang" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vendor" (
    "key" TEXT NOT NULL,
    "namaVendor" TEXT NOT NULL,
    "nilaiKeseluruhan" DOUBLE PRECISION NOT NULL,
    "evaluasiVendor" DOUBLE PRECISION NOT NULL,
    "suratPeringatan" TEXT NOT NULL,
    "totalProyek" INTEGER NOT NULL,
    "suratPeringatanDetail" JSONB,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "public"."Kontrak" (
    "key" TEXT NOT NULL,
    "namaPekerjaan" TEXT NOT NULL,
    "subBidang" TEXT NOT NULL,
    "tipePekerjaan" TEXT NOT NULL,
    "direksiPekerjaan" TEXT NOT NULL,
    "pengawasPekerjaan" TEXT NOT NULL,
    "vendorKey" TEXT NOT NULL,
    "vendorKHS" TEXT NOT NULL,
    "nilaiTotal" DOUBLE PRECISION NOT NULL,
    "nomorKontrak" TEXT NOT NULL,
    "nomorAmandemenKontrak" TEXT NOT NULL,
    "amandemenKontrakDetail" JSONB,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3) NOT NULL,
    "terminPembayaran" TEXT NOT NULL,
    "infoStatusPembayaran" TEXT NOT NULL,
    "dataStatusPembayaran" JSONB NOT NULL,
    "infoEvaluasi" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Kontrak_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Kontrak" ADD CONSTRAINT "Kontrak_vendorKey_fkey" FOREIGN KEY ("vendorKey") REFERENCES "public"."Vendor"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
