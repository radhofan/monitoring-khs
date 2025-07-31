'use client';

import React from 'react';
import { Divider, Space } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import InformasiUmum from '@/components/organisms/pengajuanBaru/InformasiUmum';
import TerminPembayaran from '@/components/organisms/pengajuanBaru/TerminPembayaran';
import DokumenAdministrasi from '@/components/organisms/pengajuanBaru/DokumenAdministrasi';
import PrimaryButton from '@/components/atoms/PrimaryButton';
import { DropdownOption } from '@/types/DropdownOption';
import { PengajuanBaruForm } from '@/types/PengajuanBaruForm';

type Props = {
  // Form data and handlers
  form: PengajuanBaruForm;
  errors: Partial<Record<keyof PengajuanBaruForm, string>>;
  onChange: <K extends keyof PengajuanBaruForm>(
    // eslint-disable-next-line no-unused-vars
    field: K,
    // eslint-disable-next-line no-unused-vars
    value: PengajuanBaruForm[K]
  ) => void;

  // Dropdown options
  tipePekerjaanOptions: DropdownOption[];
  vendorOptions: DropdownOption[];

  // Termin Pembayaran
  terminType: 'milestone' | 'tanggal';
  milestoneCount: number;
  // eslint-disable-next-line no-unused-vars
  onTerminTypeChange: (value: 'milestone' | 'tanggal') => void;
  // eslint-disable-next-line no-unused-vars
  onMilestoneCountChange: (value: number) => void;

  // File upload
  fileList: UploadFile[];
  onFileChange: UploadProps['onChange'];
  onBeforeUpload?: UploadProps['beforeUpload'];

  // Submit
  loading?: boolean;
  onSubmit: () => void;

  // Optional styling
  style?: React.CSSProperties;
  className?: string;
};

const PengajuanBaruTemplate: React.FC<Props> = ({
  // Form props
  form,
  errors,
  onChange,

  // Dropdown options
  tipePekerjaanOptions,
  vendorOptions,

  // Termin props
  terminType,
  milestoneCount,
  onTerminTypeChange,
  onMilestoneCountChange,

  // File props
  fileList,
  onFileChange,
  onBeforeUpload,

  // Submit props
  loading = false,
  onSubmit,

  // Styling
  style,
  className,
}) => {
  return (
    <div className={className} style={style}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Section 1: Informasi Umum */}
        <InformasiUmum
          form={form}
          errors={errors}
          onChange={onChange}
          tipePekerjaanOptions={tipePekerjaanOptions}
          vendorOptions={vendorOptions}
        />

        <Divider />

        {/* Section 2: Termin Pembayaran */}
        <TerminPembayaran
          terminType={terminType}
          milestoneCount={milestoneCount}
          onTypeChange={onTerminTypeChange}
          onCountChange={onMilestoneCountChange}
        />

        <Divider />

        {/* Section 3: Dokumen Administrasi */}
        <DokumenAdministrasi
          fileList={fileList}
          onChange={onFileChange}
          onBeforeUpload={onBeforeUpload}
          style={{ marginBottom: 24 }}
        />

        {/* Submit Button */}
        <PrimaryButton loading={loading} onClick={onSubmit}>
          Submit
        </PrimaryButton>
      </Space>
    </div>
  );
};

export default PengajuanBaruTemplate;
