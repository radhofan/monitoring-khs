'use client';

import {
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  InputNumber,
  Result,
  message,
} from 'antd';
import { UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { UploadFile } from 'antd';
import type { FormItemProps } from 'antd';

type InputAmandemenModalProps = {
  visible: boolean;
  onClose: () => void;
};

type AmandemenFormData = {
  nomorAmandemen: string;
  perubahanKontrak: string;
  perubahanDireksi?: string;
  perubahanPengawas?: string;
  tanggalBerlaku: string;
  nilaiKontrak: number;
  perubahanTermin?: string;
  file: UploadFile[];
};

export default function InputAmandemenModal({
  visible,
  onClose,
}: InputAmandemenModalProps) {
  const [form] = Form.useForm<AmandemenFormData>();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values: AmandemenFormData) => {
    console.log('Form values:', values);
    setLoading(true);

    setTimeout(() => {
      message.success('Amandemen berhasil disimpan (dummy)');
      setLoading(false);
      setSubmitted(true);
      form.resetFields();
    }, 1000);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const normFile: NonNullable<FormItemProps['getValueFromEvent']> = (e) => {
    return Array.isArray(e) ? e : (e?.fileList ?? []);
  };

  return (
    <Modal
      open={visible}
      title="Input Amandemen Kontrak"
      onCancel={handleClose}
      footer={null}
    >
      {submitted ? (
        <Result
          status="success"
          icon={
            <CheckCircleOutlined style={{ color: 'green', fontSize: 64 }} />
          }
          title="Amandemen Berhasil Disimpan!"
          subTitle="Data amandemen telah berhasil diunggah dan dicatat."
          extra={[
            <Button type="primary" key="close" onClick={handleClose}>
              Tutup
            </Button>,
          ]}
        />
      ) : (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="nomorAmandemen"
            label="Nomor Amandemen Kontrak"
            rules={[{ required: true, message: 'Mohon isi nomor amandemen' }]}
          >
            <Input placeholder="Contoh: AMD-2025-001" />
          </Form.Item>

          <Form.Item
            name="perubahanKontrak"
            label="Input Perubahan Kontrak"
            rules={[{ required: true, message: 'Mohon isi perubahan kontrak' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="perubahanDireksi"
            label="Perubahan Direksi Pekerjaan"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="perubahanPengawas"
            label="Perubahan Pengawas Pekerjaan"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tanggalBerlaku"
            label="Perubahan Tanggal Berlaku Kontrak"
            rules={[{ required: true, message: 'Mohon pilih tanggal' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="nilaiKontrak"
            label="Perubahan Nilai Kontrak"
            rules={[{ required: true, message: 'Mohon isi nilai kontrak' }]}
          >
            <InputNumber<number>
              style={{ width: '100%' }}
              min={0}
              formatter={(value) =>
                `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
              parser={(value) => {
                if (!value) return 0;
                return parseInt(value.replace(/[^0-9]/g, ''), 10);
              }}
            />
          </Form.Item>

          <Form.Item label="Perubahan Termin">
            <div style={{ display: 'flex', gap: 8 }}>
              <Input
                disabled
                value="3"
                style={{ flex: 1 }}
                placeholder="Jumlah termin sebelumnya"
              />
              <Form.Item name="perubahanTermin" noStyle>
                <Input style={{ flex: 1 }} placeholder="Jumlah termin baru" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            name="file"
            label="Upload File Amandemen"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Mohon upload file' }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Pilih File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit Amandemen
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
