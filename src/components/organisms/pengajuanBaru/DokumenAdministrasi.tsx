'use client';

import React from 'react';
import { Typography } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import FileInput from '@/components/atoms/FileInput';

const { Title } = Typography;

type Props = {
  fileList?: UploadFile[];
  onChange?: UploadProps['onChange'];
  onBeforeUpload?: UploadProps['beforeUpload'];
  multiple?: boolean;
  accept?: string;
  style?: React.CSSProperties;
  className?: string;
};

const DokumenAdministrasi: React.FC<Props> = ({
  fileList,
  onChange,
  onBeforeUpload,
  multiple = true,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.png',
  style,
  className,
}) => {
  return (
    <div className={className} style={style}>
      <Title level={4}>3. Dokumen Administrasi</Title>
      <FileInput
        multiple={multiple}
        fileList={fileList}
        onChange={onChange}
        onBeforeUpload={onBeforeUpload}
        accept={accept}
        style={{ padding: 12 }}
      />
    </div>
  );
};

export default DokumenAdministrasi;
