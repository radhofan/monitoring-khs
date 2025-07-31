'use client';

import React from 'react';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

type Props = {
  fileList?: UploadFile[];
  onChange?: UploadProps['onChange'];
  onBeforeUpload?: UploadProps['beforeUpload'];
  multiple?: boolean;
  accept?: string;
  style?: React.CSSProperties;
  className?: string;
  dragText?: string;
  hintText?: string;
};

const FileInput: React.FC<Props> = ({
  fileList,
  onChange,
  onBeforeUpload,
  multiple = true,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.png',
  style,
  className,
  dragText = 'Klik atau drag file ke area ini untuk mengunggah',
  hintText = 'Bisa unggah beberapa file sekaligus',
}) => {
  return (
    <Dragger
      multiple={multiple}
      fileList={fileList}
      onChange={onChange}
      beforeUpload={onBeforeUpload || (() => false)}
      accept={accept}
      style={style}
      className={className}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{dragText}</p>
      <p className="ant-upload-hint">{hintText}</p>
    </Dragger>
  );
};

export default FileInput;
