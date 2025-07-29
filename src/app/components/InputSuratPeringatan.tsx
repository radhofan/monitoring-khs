"use client";

import { Modal, Form, Input, DatePicker, Upload, Button } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

type InputSuratPeringatanModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function InputSuratPeringatanModal({
  visible,
  onClose,
}: InputSuratPeringatanModalProps) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      // Submit logic here

      onClose();
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      title="Input Surat Peringatan"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="nomorSurat"
          label="Nomor Surat Peringatan"
          rules={[{ required: true, message: "Mohon isi nomor surat" }]}
        >
          <Input placeholder="Contoh: 123/SP/HRD/2025" />
        </Form.Item>

        <Form.Item
          name="tanggalRp"
          label="Tanggal Surat Peringatan"
          rules={[{ required: true, message: "Mohon pilih tanggal" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="file"
          label="Upload File Surat"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Mohon upload file" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Pilih File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
