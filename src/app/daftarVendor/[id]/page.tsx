'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  Typography,
  Tag,
  Card,
  Button,
  Avatar,
  Row,
  Col,
  Input,
  Space,
} from 'antd';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/es/table';
import { Kontrak, AmandemenKontrak, SuratPeringatan } from '@/app/types';
import ViewPembayaranModal from '@/app/components/ViewPembayaran';
import EvaluasiVendorModal from '@/app/components/EvaluasiVendor';
import InputAmandemenModal from '@/app/components/InputAmandemen';
import InputSuratPeringatanModal from '@/app/components/InputSuratPeringatan';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Text } = Typography;

const data: Kontrak[] = [
  {
    key: '1',
    namaPekerjaan: 'Implementasi e-Document Management System',
    tipePekerjaan: 'Pengembangan / Change Request',
    direksiPekerjaan: 'Ahmad Fauzi',
    pengawasPekerjaan: 'Nina Rachmawati',
    vendorKHS: 'PT Akhdani Reka Solusi (Akhdani)',
    nilaiTotal: 2000000000,
    nomorKontrak: 'K-A1312',
    nomorAmandemenKontrak: '-',
    tanggalMulai: '05/01/2024',
    tanggalSelesai: '30/06/2024',
    terminPembayaran: 'Termin 3',
    infoStatusPembayaran: 'Terbayar Semua',
    dataStatusPembayaran: {
      1: { status: 'Terbayar', dokumen: ['kwitansi1.pdf'] },
      2: { status: 'Terbayar', dokumen: ['kwitansi2.pdf'] },
      3: { status: 'Terbayar', dokumen: ['kwitansi3.pdf'] },
    },
  },
];

const amandemenData: AmandemenKontrak[] = [
  {
    key: 'A1',
    nomorAmandemen: 'AM-2024-01',
    tanggal: '01/03/2024',
    deskripsi: 'Penambahan fitur dokumen OCR dan indexing otomatis.',
  },
  {
    key: 'A2',
    nomorAmandemen: 'AM-2024-02',
    tanggal: '15/04/2024',
    deskripsi: 'Perubahan jadwal implementasi modul approval.',
  },
];

const peringatanData: SuratPeringatan[] = [
  {
    key: 'SP1',
    nomor: 'SP-2024-01',
    tanggal: '10/05/2024',
    alasan: 'Keterlambatan penyampaian laporan mingguan.',
  },
  {
    key: 'SP2',
    nomor: 'SP-2024-02',
    tanggal: '25/06/2024',
    alasan: 'Kualitas deliverable tidak sesuai spesifikasi.',
  },
];

export default function DaftarVendorDetailPage() {
  // const params = useParams();
  // const id = params.id;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Kontrak | null>(null);
  const [showInputAmandemenModal, setShowInputAmandemenModal] = useState(false);
  const [showInputPeringatanModal, setShowInputPeringatanModal] =
    useState(false);
  const [, setSearchText] = useState('');
  const [, setSearchedColumn] = useState('');

  const handleEdit = (record: Kontrak) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

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
      filters: Array.from(new Set(data.map((item) => item.tipePekerjaan))).map(
        (type) => ({ text: type, value: type })
      ),
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
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Pengawas Pekerjaan',
      dataIndex: 'pengawasPekerjaan',
      key: 'pengawasPekerjaan',
      ...getColumnSearchProps('pengawasPekerjaan'),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Vendor KHS',
      dataIndex: 'vendorKHS',
      key: 'vendorKHS',
      ...getColumnSearchProps('vendorKHS'),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Nilai Total',
      dataIndex: 'nilaiTotal',
      key: 'nilaiTotal',
      sorter: (a, b) => a.nilaiTotal - b.nilaiTotal,
      render: (value: number) => (
        <span style={{ color: '#389e0d' }}>{formatRupiah(value)}</span>
      ),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Nomor Kontrak',
      dataIndex: 'nomorKontrak',
      key: 'nomorKontrak',
      ...getColumnSearchProps('nomorKontrak'),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Nomor Amandemen Kontrak',
      dataIndex: 'nomorAmandemenKontrak',
      key: 'nomorAmandemenKontrak',
      ...getColumnSearchProps('nomorAmandemenKontrak'),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Mulai Kontrak',
      dataIndex: 'tanggalMulai',
      key: 'tanggalMulai',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Selesai Kontrak',
      dataIndex: 'tanggalSelesai',
      key: 'tanggalSelesai',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Termin Pembayaran Saat Ini',
      dataIndex: 'terminPembayaran',
      key: 'terminPembayaran',
      render: (text) => <Tag color="blue">{text}</Tag>,
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Status Pembayaran Termin',
      key: 'infoStatusPembayaran',
      width: 220,
      filters: Array.from(
        new Set(data.map((item) => item.infoStatusPembayaran))
      ).map((type) => ({ text: type, value: type })),
      onFilter: (value, record) => record.infoStatusPembayaran === value,
      render: (_, record) => (
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
      render: (_, record) => (
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
          Evaluasi
        </Button>
      ),
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
  ];

  const amandemenColumns: ColumnsType<AmandemenKontrak> = [
    {
      title: 'Nomor Amandemen',
      dataIndex: 'nomorAmandemen',
      key: 'nomorAmandemen',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Deskripsi',
      dataIndex: 'deskripsi',
      key: 'deskripsi',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
  ];

  const peringatanColumns: ColumnsType<SuratPeringatan> = [
    {
      title: 'Nomor Surat',
      dataIndex: 'nomor',
      key: 'nomor',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
    {
      title: 'Alasan',
      dataIndex: 'alasan',
      key: 'alasan',
      onHeaderCell: () => ({ style: headerStyle }),
      onCell: () => ({ style: cellStyle }),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: 24 }}
    >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        style={{ marginBottom: 16 }}
      >
        Kembali
      </Button>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={16} align="middle">
            <Col>
              <Avatar
                size={100}
                src="https://via.placeholder.com/100x100.png?text=Vendor"
              />
            </Col>
            <Col>
              <Title level={4}>PT Akhdani Reka Solusi (Akhdani)</Title>
              <Text>📍 Jl. Contoh Alamat No.123, Jakarta Selatan</Text>
              <br />
              <Text>📞 (021) 123-4567</Text>
              <br />
              <Text>✉️ info@akhdani.com</Text>
            </Col>
          </Row>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Title level={3}>Daftar Kontrak</Title>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 5 }}
            bordered
            rowKey="key"
            scroll={{ x: 'max-content' }}
          />
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Title level={3}>Amandemen Kontrak</Title>
          <Table
            dataSource={amandemenData}
            columns={amandemenColumns}
            pagination={false}
            bordered
            rowKey="key"
          />
          <Button
            type="primary"
            style={{ marginTop: 24 }}
            onClick={() => setShowInputAmandemenModal(true)}
          >
            Input Amandemen Baru
          </Button>
        </Card>

        <Card>
          <Title level={3}>Surat Peringatan</Title>
          <Table
            dataSource={peringatanData}
            columns={peringatanColumns}
            pagination={false}
            bordered
            rowKey="key"
          />
          <Button
            type="primary"
            style={{ marginTop: 24 }}
            onClick={() => setShowInputPeringatanModal(true)}
          >
            Input Surat Peringatan Baru
          </Button>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showModal && selectedRecord && (
          <motion.div
            key="modal1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ViewPembayaranModal
              visible={showModal}
              data={selectedRecord}
              onClose={() => setShowModal(false)}
            />
          </motion.div>
        )}

        {showEvaluasiModal && selectedRecord && (
          <motion.div
            key="modal2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EvaluasiVendorModal
              visible={showEvaluasiModal}
              data={selectedRecord}
              onClose={() => setShowEvaluasiModal(false)}
            />
          </motion.div>
        )}

        {showInputAmandemenModal && (
          <motion.div
            key="modal3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InputAmandemenModal
              visible={showInputAmandemenModal}
              onClose={() => setShowInputAmandemenModal(false)}
            />
          </motion.div>
        )}

        {showInputPeringatanModal && (
          <motion.div
            key="modal4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InputSuratPeringatanModal
              visible={showInputPeringatanModal}
              onClose={() => setShowInputPeringatanModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
