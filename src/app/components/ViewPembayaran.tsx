'use client';

import { useState } from 'react';
import {
  Modal,
  Steps,
  Typography,
  Form,
  Select,
  Upload,
  Button,
  message,
  Result,
} from 'antd';
import { Kontrak } from '@/types/Data';
import {
  FileOutlined,
  InboxOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, FormItemProps } from 'antd';

const { Step } = Steps;
const { Paragraph, Text, Link } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

interface ViewPembayaranModalProps {
  visible: boolean;
  data: Kontrak;
  onClose: () => void;
}

interface PembayaranFormData {
  termin: string;
  dokumen: UploadFile[];
}

export default function ViewPembayaranModal({
  visible,
  data,
  onClose,
}: ViewPembayaranModalProps) {
  const [form] = Form.useForm<PembayaranFormData>();
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const terminList = Object.entries(data.dataStatusPembayaran ?? {}).sort(
    ([a], [b]) => Number(a) - Number(b)
  );

  const handleSubmit = (values: PembayaranFormData) => {
    console.log('Form submitted:', values);
    setUploading(true);

    setTimeout(() => {
      message.success('Data pembayaran berhasil disiapkan (dummy)');
      setUploading(false);
      setSubmitted(true);
      form.resetFields();
    }, 1000);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const normFile: NonNullable<FormItemProps['getValueFromEvent']> = (e) =>
    Array.isArray(e) ? e : (e?.fileList ?? []);

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      title="Detail Pembayaran Kontrak"
      width={700}
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
    >
      {submitted ? (
        <Result
          status="success"
          icon={
            <CheckCircleOutlined style={{ color: 'green', fontSize: 64 }} />
          }
          title="Pembayaran Berhasil Dikirim!"
          subTitle="Dokumen pembayaran telah berhasil diunggah dan sedang diproses."
          extra={[
            <Button type="primary" key="close" onClick={handleClose}>
              Tutup
            </Button>,
          ]}
        />
      ) : (
        <>
          <p>
            <strong>Nama Pekerjaan:</strong> {data.namaPekerjaan}
          </p>
          <p>
            <strong>Vendor KHS:</strong> {data.vendorKHS}
          </p>
          <p>
            <strong>Status Pembayaran:</strong> {data.infoStatusPembayaran}
          </p>

          <Steps
            direction="vertical"
            size="small"
            current={
              terminList.filter(([, val]) => val.status === 'Terbayar').length -
              1
            }
          >
            {terminList.map(([termin, detail]) => (
              <Step
                key={termin}
                title={`Termin ${termin}`}
                status={detail.status === 'Terbayar' ? 'finish' : 'wait'}
                description={
                  <>
                    <Paragraph style={{ marginBottom: 4 }}>
                      <Text
                        type={
                          detail.status === 'Terbayar' ? 'success' : 'danger'
                        }
                      >
                        {detail.status}
                      </Text>
                    </Paragraph>
                    {detail.dokumen && detail.dokumen.length > 0 ? (
                      <ul style={{ paddingLeft: 20 }}>
                        {detail.dokumen.map((doc, idx) => (
                          <li key={idx}>
                            <Link href={doc} target="_blank">
                              <FileOutlined /> Dokumen {idx + 1}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Text type="secondary">(Belum ada dokumen)</Text>
                    )}
                  </>
                }
              />
            ))}
          </Steps>

          <p>
            <strong>Input Pembayaran:</strong>
          </p>

          <Form<PembayaranFormData>
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ marginBottom: 32 }}
          >
            <Form.Item
              name="termin"
              label="Termin Pembayaran"
              rules={[{ required: true, message: 'Pilih termin pembayaran' }]}
            >
              <Select placeholder="Pilih termin">
                {terminList.map(([key]) => (
                  <Option key={key} value={key}>
                    Termin {key}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dokumen"
              label="Upload Dokumen Pembayaran"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: 'Upload minimal satu dokumen' },
              ]}
            >
              <Dragger name="files" multiple beforeUpload={() => false}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Klik atau seret file ke sini</p>
                <p className="ant-upload-hint">Maksimal beberapa dokumen</p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={uploading}
                block
              >
                Submit Pembayaran
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
}
