'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Result, Button } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { CheckCircleOutlined } from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import PengajuanBaruTemplate from '@/components/templates/PengajuanBaruTemplate';
import { PengajuanBaruForm } from '@/types/PengajuanBaruForm';
import { DropdownOption } from '@/types/DropdownOption';

const { Title } = Typography;

export default function PengajuanBaruPage() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState<PengajuanBaruForm>({
    namaPekerjaan: '',
    tipePekerjaan: '',
    direksi: '',
    pengawas: '',
    vendor: '',
    nilai: null,
    nomorKontrak: '',
    tanggalMulai: null,
    tanggalSelesai: null,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PengajuanBaruForm, string>>
  >({});

  // Termin state
  const [terminType, setTerminType] = useState<'milestone' | 'tanggal'>(
    'milestone'
  );
  const [milestoneCount, setMilestoneCount] = useState<number>(1);

  // File state
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Options data
  const tipePekerjaanOptions: DropdownOption[] = [
    { value: 'change', label: 'Pengembangan / Change Request' },
    { value: 'ophar', label: 'Pemeliharaan / Ophar' },
  ];

  const vendorOptions: DropdownOption[] = [
    { value: 'akhdani', label: 'PT Akhdani Reka Solusi (Akhdani)' },
    { value: 'pds', label: 'PT Prima Data Semesta (PDS)' },
    { value: 'iglo', label: 'PT Indocyber Global Teknologi (IGLO)' },
    { value: 'webcenter', label: 'PT Webcenter Sentra Solusindo' },
    { value: 'ddn', label: 'PT Duta Digital Nusantara (DDN)' },
    { value: 'bangunindo', label: 'PT Bangunindo Tekunsa Jaya' },
    { value: 'ecomindo', label: 'PT Ecomindo Saranacipta' },
  ];

  // Handlers
  const handleInputChange = <K extends keyof PengajuanBaruForm>(
    key: K,
    value: PengajuanBaruForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validateForm = (): Partial<Record<keyof PengajuanBaruForm, string>> => {
    const newErrors: Partial<Record<keyof PengajuanBaruForm, string>> = {};
    if (!form.namaPekerjaan.trim()) newErrors.namaPekerjaan = 'Wajib diisi';
    if (!form.tipePekerjaan) newErrors.tipePekerjaan = 'Wajib diisi';
    if (!form.direksi.trim()) newErrors.direksi = 'Wajib diisi';
    if (!form.pengawas.trim()) newErrors.pengawas = 'Wajib diisi';
    if (!form.vendor) newErrors.vendor = 'Wajib diisi';
    if (form.nilai === null) newErrors.nilai = 'Wajib diisi';
    if (!form.nomorKontrak.trim()) newErrors.nomorKontrak = 'Wajib diisi';
    if (!form.tanggalMulai) newErrors.tanggalMulai = 'Wajib diisi';
    if (!form.tanggalSelesai) newErrors.tanggalSelesai = 'Wajib diisi';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(true);
    }, 1200);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    router.push('/');
  };

  return (
    <div style={{ padding: 24 }}>
      <AnimatePresence mode="wait">
        {!isModalVisible ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Title level={2}>Pengajuan Kontrak Baru</Title>

            <PengajuanBaruTemplate
              // Form props
              form={form}
              errors={errors}
              onChange={handleInputChange}
              // Options
              tipePekerjaanOptions={tipePekerjaanOptions}
              vendorOptions={vendorOptions}
              // Termin props
              terminType={terminType}
              milestoneCount={milestoneCount}
              onTerminTypeChange={setTerminType}
              onMilestoneCountChange={setMilestoneCount}
              // File props
              fileList={fileList}
              onFileChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
              }}
              onBeforeUpload={() => false}
              // Submit props
              loading={loading}
              onSubmit={handleSubmit}
            />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Result
              status="success"
              title="Kontrak Berhasil Diajukan!"
              subTitle="Pengajuan kontrak berhasil dikirim dan sedang diproses."
              icon={
                <CheckCircleOutlined style={{ color: 'green', fontSize: 64 }} />
              }
              extra={[
                <Button type="primary" key="ok" onClick={handleModalOk}>
                  Kembali ke Daftar Kontrak
                </Button>,
              ]}
              style={{ paddingTop: 60 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
