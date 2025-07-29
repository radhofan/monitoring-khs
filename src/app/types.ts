export interface Kontrak {
  key: string;
  namaPekerjaan: string;
  tipePekerjaan: string;
  direksiPekerjaan: string;
  pengawasPekerjaan: string;
  vendorKHS: string;
  nilaiTotal: number;
  nomorKontrak: string;
  nomorAmandemenKontrak: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  terminPembayaran: string;
  infoStatusPembayaran:
    | 'Terbayar Semua'
    | 'Belum Terbayar Semua'
    | 'Terbayar Sebagian';
  dataStatusPembayaran: Record<number, TerminDetail>;
}

export interface TerminDetail {
  status: 'Terbayar' | 'Belum Terbayar';
  dokumen?: string[];
}

export interface Vendor {
  key: string;
  namaVendor: string;
  nilaiKeseluruhan: number;
  evaluasiVendor: number;
  suratPeringatan: 'Ada' | 'Tidak ada';
  totalProyek: number;
}

export type AmandemenKontrak = {
  key: string;
  nomorAmandemen: string;
  tanggal: string;
  deskripsi: string;
};

export type SuratPeringatan = {
  key: string;
  nomor: string;
  tanggal: string;
  alasan: string;
};
