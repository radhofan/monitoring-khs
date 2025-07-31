import dayjs from 'dayjs';

export type PengajuanBaruForm = {
  namaPekerjaan: string;
  direksi: string;
  pengawas: string;
  nomorKontrak: string;
  tipePekerjaan: string;
  vendor: string;
  nilai: number | null;
  tanggalMulai: dayjs.Dayjs | null;
  tanggalSelesai: dayjs.Dayjs | null;
};
