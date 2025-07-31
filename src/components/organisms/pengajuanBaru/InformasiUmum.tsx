import React from 'react';
import SectionTitle from '@/components/atoms/SectionTitle';
import TextFieldWithLabel from '@/components/molecules/TextFieldWithLabel';
import SelectFieldWithLabel from '@/components/molecules/SelectFieldWithLabel';
import NumberFieldWithLabel from '@/components/molecules/NumberFieldWithLabel';
import DateFieldWithLabel from '@/components/molecules/DateFieldWithLabel';
import { Space } from 'antd';
import { DropdownOption } from '@/types/DropdownOption';
import { PengajuanBaruForm } from '@/types/PengajuanBaruForm';

type Props = {
  form: PengajuanBaruForm;
  errors: Partial<Record<keyof PengajuanBaruForm, string>>;
  onChange: <K extends keyof PengajuanBaruForm>(
    // eslint-disable-next-line no-unused-vars
    field: K,
    // eslint-disable-next-line no-unused-vars
    value: PengajuanBaruForm[K]
  ) => void;
  tipePekerjaanOptions: DropdownOption[];
  vendorOptions: DropdownOption[];
};

const InformasiUmum: React.FC<Props> = ({
  form,
  errors,
  onChange,
  tipePekerjaanOptions,
  vendorOptions,
}) => {
  return (
    <div>
      <SectionTitle>1. Informasi Umum</SectionTitle>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <TextFieldWithLabel
          label="Nama Pekerjaan *"
          value={form.namaPekerjaan}
          onChange={(value) => onChange('namaPekerjaan', value)}
          placeholder="Nama Pekerjaan"
          status={errors.namaPekerjaan}
        />
        <TextFieldWithLabel
          label="Direksi Pekerjaan *"
          value={form.direksi}
          onChange={(value) => onChange('direksi', value)}
          placeholder="Direksi Pekerjaan"
          status={errors.direksi}
        />
        <TextFieldWithLabel
          label="Pengawas Pekerjaan *"
          value={form.pengawas}
          onChange={(value) => onChange('pengawas', value)}
          placeholder="Pengawas Pekerjaan"
          status={errors.pengawas}
        />
        <TextFieldWithLabel
          label="Nomor Kontrak *"
          value={form.nomorKontrak}
          onChange={(value) => onChange('nomorKontrak', value)}
          placeholder="Nomor Kontrak"
          status={errors.nomorKontrak}
        />
        <SelectFieldWithLabel
          label="Tipe Pekerjaan *"
          value={form.tipePekerjaan}
          onChange={(value) => onChange('tipePekerjaan', value)}
          options={tipePekerjaanOptions}
          placeholder="Select Tipe Pekerjaan"
          status={errors.tipePekerjaan}
        />
        <SelectFieldWithLabel
          label="Nama Vendor KHS *"
          value={form.vendor}
          onChange={(value) => onChange('vendor', value)}
          options={vendorOptions}
          placeholder="Select a Vendor"
          status={errors.vendor}
        />
        <NumberFieldWithLabel
          label="Nilai Pekerjaan Total *"
          value={form.nilai}
          onChange={(value) => onChange('nilai', value)}
          placeholder="1000000000"
          status={errors.nilai}
        />
        <DateFieldWithLabel
          label="Tanggal Berlaku Kontrak *"
          value={form.tanggalMulai}
          onChange={(value) => onChange('tanggalMulai', value)}
          status={errors.tanggalMulai}
          disabledDate={(current) =>
            form.tanggalSelesai
              ? current && current.isAfter(form.tanggalSelesai)
              : false
          }
        />
        <DateFieldWithLabel
          label="Tanggal Selesai Kontrak *"
          value={form.tanggalSelesai}
          onChange={(value) => onChange('tanggalSelesai', value)}
          disabledDate={(current) =>
            form.tanggalMulai
              ? current && current.isBefore(form.tanggalMulai)
              : false
          }
          status={errors.tanggalSelesai}
        />
      </Space>
    </div>
  );
};

export default InformasiUmum;
