'use client';
import React from 'react';
import { Radio } from 'antd';
import SectionTitle from '@/components/atoms/SectionTitle';
import NumberFieldWithLabel from '@/components/molecules/NumberFieldWithLabel';

type Props = {
  terminType: 'milestone' | 'tanggal';
  milestoneCount: number;
  // eslint-disable-next-line no-unused-vars
  onTypeChange: (value: 'milestone' | 'tanggal') => void;
  // eslint-disable-next-line no-unused-vars
  onCountChange: (value: number) => void;
};

const TerminPembayaran: React.FC<Props> = ({
  terminType,
  milestoneCount,
  onTypeChange,
  onCountChange,
}) => {
  return (
    <div>
      <SectionTitle>2. Termin Pembayaran</SectionTitle>
      <Radio.Group
        value={terminType}
        onChange={(e) => onTypeChange(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        <Radio value="milestone">Termin Milestones</Radio>
        <Radio value="tanggal">Termin Tanggal</Radio>
      </Radio.Group>

      {terminType === 'milestone' ? (
        <NumberFieldWithLabel
          label="Jumlah Termin (1–12) *"
          value={milestoneCount}
          onChange={(val) => onCountChange(val || 1)}
          placeholder="1–12"
        />
      ) : (
        <NumberFieldWithLabel
          label="Tanggal Pembayaran Rutin (1–30) *"
          value={milestoneCount}
          onChange={(val) => onCountChange(val || 1)}
          placeholder="1–30"
        />
      )}
    </div>
  );
};

export default TerminPembayaran;
