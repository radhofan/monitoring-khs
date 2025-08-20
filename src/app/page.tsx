'use client';

import { useState } from 'react';
import { Table, Typography, Tag, Card, Button, Input, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/es/table';
import { Kontrak, TerminDetail } from '@/types/types';
import ViewPembayaranModal from '@/app/components/ViewPembayaran';
import EvaluasiVendorModal from '@/app/components/EvaluasiVendor';
import DataDashboard from '@/app/components/DataDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumToRupiah } from '@/lib/currency';
import { useStore } from 'zustand';
import { authStore } from '@/stores/useAuthStore';
import { kontrak } from '@/types/dummy';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/lib/date';

const { Title } = Typography;

export default function DaftarKontrakPage() {
  const user = useStore(authStore, (s) => s.user);
  const [showModal, setShowModal] = useState(false);
  const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Kontrak | null>(null);
  const [, setSearchText] = useState('');
  const [, setSearchedColumn] = useState('');
  const handleEdit = (record: Kontrak) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // PROD
  const { data: kontraks, isLoading } = useQuery({
    queryKey: ['kontrak', user?.subBidang],
    queryFn: async () => {
      let url = '/api/kontrak/get-kontrak-all';

      if (user?.subBidang) {
        url = `/api/kontrak/get-kontrak-by-sub-bidang?subBidang=${encodeURIComponent(
          user.subBidang
        )}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch kontrak');
      return res.json();
    },
    enabled: !!user,
  });

  const getColumnSearchProps = (
    dataIndex: keyof Kontrak
  ): ColumnType<Kontrak> => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Cari ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => {
              confirm();
              setSearchedColumn(dataIndex);
            }}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                setSearchedColumn(dataIndex);
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Cari
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                confirm();
                setSearchText('');
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filters: [],
      onFilter: (value, record) =>
        String(record[dataIndex])
          .toLowerCase()
          .includes((value as string).toLowerCase()),
    };
  };

  const headerStyle = {
    backgroundColor: '#1f2937',
    color: 'white',
    border: '1px solid #3f3f46',
  };

  const cellStyle = {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
  };

  const columns: ColumnsType<Kontrak> = [
    {
      title: 'Nama Pekerjaan',
      dataIndex: 'namaPekerjaan',
      key: 'namaPekerjaan',
      ...getColumnSearchProps('namaPekerjaan'),
      render: (text) => <p>{text}</p>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Tipe Pekerjaan',
      dataIndex: 'tipePekerjaan',
      key: 'tipePekerjaan',
      filters: Array.from(
        new Set(kontrak.map((item) => item.tipePekerjaan))
      ).map((type) => ({
        text: type,
        value: type,
      })),
      onFilter: (value, record) => record.tipePekerjaan === value,
      render: (tipe) => (
        <Tag color={tipe.includes('Pengembangan') ? 'geekblue' : 'volcano'}>
          {tipe}
        </Tag>
      ),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Direksi Pekerjaan',
      dataIndex: 'direksiPekerjaan',
      key: 'direksiPekerjaan',
      ...getColumnSearchProps('direksiPekerjaan'),
      render: (text) => <p>{text}</p>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Pengawas Pekerjaan',
      dataIndex: 'pengawasPekerjaan',
      key: 'pengawasPekerjaan',
      ...getColumnSearchProps('pengawasPekerjaan'),
      render: (text) => <p>{text}</p>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Vendor KHS',
      dataIndex: 'vendorKHS',
      key: 'vendorKHS',
      ...getColumnSearchProps('vendorKHS'),
      render: (text) => <p>{text}</p>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Nilai Total',
      dataIndex: 'nilaiTotal',
      key: 'nilaiTotal',
      sorter: (a, b) => a.nilaiTotal - b.nilaiTotal,
      render: (value: number) => (
        <p style={{ color: '#389e0d' }}>{formatNumToRupiah(value)}</p>
      ),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Nomor Kontrak',
      dataIndex: 'nomorKontrak',
      key: 'nomorKontrak',
      ...getColumnSearchProps('nomorKontrak'),
      render: (text) => <p>{text}</p>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Nomor Amandemen Kontrak',
      dataIndex: 'nomorAmandemenKontrak',
      key: 'nomorAmandemenKontrak',
      ...getColumnSearchProps('nomorAmandemenKontrak'),
      render: (text) => <p>{text || '-'}</p>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Mulai Kontrak',
      dataIndex: 'tanggalMulai',
      key: 'tanggalMulai',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Selesai Kontrak',
      dataIndex: 'tanggalSelesai',
      key: 'tanggalSelesai',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Jenis Termin Pembayaran',
      dataIndex: 'jenisTerminPembayaran',
      key: 'jenisTerminPembayaran',
      render: (text) => <Tag color="blue">{text}</Tag>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    // Prod
    {
      title: 'Termin Pembayaran Saat Ini',
      dataIndex: 'dataStatusPembayaran',
      key: 'terminPembayaran',
      render: (dataStatusPembayaran: Record<number, TerminDetail>) => {
        if (!dataStatusPembayaran) return null;
        const entries = Object.entries(dataStatusPembayaran);
        const firstUnpaid = entries.find(
          ([, termin]) => termin.status === 'Belum Terbayar'
        );
        const indexToShow = firstUnpaid
          ? firstUnpaid[0]
          : entries[entries.length - 1][0];

        return <Tag color="blue">Termin {indexToShow}</Tag>;
      },
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    // Dev
    // {
    //   title: 'Termin Pembayaran Saat Ini',
    //   dataIndex: 'terminPembayaran',
    //   key: 'terminPembayaran',
    //   render: (text) => <Tag color="blue">{text}</Tag>,
    //   onHeaderCell: () => ({ style: headerStyle }),
    //   onCell: () => ({ style: cellStyle }),
    // },
    {
      title: 'Status Pembayaran Termin',
      key: 'infoStatusPembayaran',
      width: 220,
      filters: Array.from(
        new Set(kontrak.map((item) => item.infoStatusPembayaran))
      ).map((type) => ({
        text: type,
        value: type,
      })),
      onFilter: (value, record) => record.infoStatusPembayaran === value,
      render: (_: Kontrak, record: Kontrak) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag
            color={
              record.infoStatusPembayaran === 'Terbayar Semua'
                ? 'green'
                : record.infoStatusPembayaran === 'Belum Terbayar Semua'
                  ? 'red'
                  : record.infoStatusPembayaran?.includes('Pengembangan')
                    ? 'geekblue'
                    : 'volcano'
            }
          >
            {record.infoStatusPembayaran}
          </Tag>
          <Button size="small" onClick={() => handleEdit(record)}>
            Lihat Detail
          </Button>
        </div>
      ),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Evaluasi Pembayaran',
      key: 'evaluasiPembayaran',
      render: (_: Kontrak, record: Kontrak) => (
        <Button
          type="primary"
          onClick={() => {
            if (record.infoStatusPembayaran === 'Terbayar Semua') {
              setSelectedRecord(record);
              setShowEvaluasiModal(true);
            }
          }}
          disabled={record.infoStatusPembayaran !== 'Terbayar Semua'}
        >
          {record.infoEvaluasi === 'Selesai' ? 'Selesai Evaluasi' : 'Evaluasi'}
        </Button>
      ),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: 24 }}
    >
      <Card
        style={{
          border: 'none',
          // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          background: '#ffffffff',
          borderRadius: 12,
        }}
      >
        <Title level={3} style={{ marginBottom: 24 }}>
          Evaluasi Proyek
        </Title>
        <DataDashboard />
        <Table
          // DEV
          // dataSource={
          //   user?.subBidang
          //     ? kontrak.filter((item) => item.subBidang === user.subBidang)
          //     : kontrak
          // }
          //
          // PROD
          dataSource={kontraks}
          loading={isLoading}
          //
          columns={columns}
          pagination={{ pageSize: 8 }}
          bordered
          rowKey="key"
          scroll={{ x: 'max-content' }}
        />
        <AnimatePresence>
          {showModal && selectedRecord && (
            <ViewPembayaranModal
              visible={showModal}
              data={selectedRecord}
              onClose={() => setShowModal(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showEvaluasiModal && selectedRecord && (
            <EvaluasiVendorModal
              visible={showEvaluasiModal}
              data={selectedRecord}
              onClose={() => setShowEvaluasiModal(false)}
            />
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
