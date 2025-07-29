'use client';

import { useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import { Table, Typography, Tag, Card, Button, Avatar, Row, Col } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { ColumnsType } from 'antd/es/table';
import { Kontrak } from '@/app/types';
import ViewPembayaranModal from '@/app/components/ViewPembayaran';
import EvaluasiVendorModal from '@/app/components/EvaluasiVendor';
import { AmandemenKontrak, SuratPeringatan } from '@/app/types';
import InputAmandemenModal from '@/app/components/InputAmandemen'
import InputSuratPeringatanModal from '@/app/components/InputSuratPeringatan';

const { Title, Text } = Typography;

const data: Kontrak[] = [
  {
    key: '1',
    namaPekerjaan: 'Implementasi e-Document Management System',
    tipePekerjaan: 'Pengembangan / Change Request',
    direksiPekerjaan: 'Ahmad Fauzi',
    pengawasPekerjaan: 'Nina Rachmawati',
    vendorKHS: 'PT Akhdani Reka Solusi (Akhdani)',
    nilaiTotal: 'Rp2.000.000.000',
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
  const params = useParams()
  const id = params.id
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Kontrak | null>(null);
  const [showInputAmandemenModal, setShowInputAmandemenModal] = useState(false);
  const [showInputPeringatanModal, setShowInputPeringatanModal] = useState(false);

  const handleEdit = (record: Kontrak) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const columns: ColumnsType<Kontrak> = [
    {
      title: 'Nama Pekerjaan',
      dataIndex: 'namaPekerjaan',
      key: 'namaPekerjaan',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Tipe Pekerjaan',
      dataIndex: 'tipePekerjaan',
      key: 'tipePekerjaan',
      render: (tipe) => (
        <Tag color={tipe.includes('Pengembangan') ? 'geekblue' : 'volcano'}>
          {tipe}
        </Tag>
      ),
    },
    {
      title: 'Direksi Pekerjaan',
      dataIndex: 'direksiPekerjaan',
      key: 'direksiPekerjaan',
    },
    {
      title: 'Pengawas Pekerjaan',
      dataIndex: 'pengawasPekerjaan',
      key: 'pengawasPekerjaan',
    },
    {
      title: 'Nilai Total',
      dataIndex: 'nilaiTotal',
      key: 'nilaiTotal',
      render: (value) => <span style={{ color: '#389e0d' }}>{value}</span>,
    },
    {
      title: 'Nomor Kontrak',
      dataIndex: 'nomorKontrak',
      key: 'nomorKontrak',
    },
    {
      title: 'Nomor Amandemen Kontrak',
      dataIndex: 'nomorAmandemenKontrak',
      key: 'nomorAmandemenKontrak',
    },
    {
      title: 'Mulai Kontrak',
      dataIndex: 'tanggalMulai',
      key: 'tanggalMulai',
    },
    {
      title: 'Selesai Kontrak',
      dataIndex: 'tanggalSelesai',
      key: 'tanggalSelesai',
    },
    {
      title: 'Termin Pembayaran Saat Ini',
      dataIndex: 'terminPembayaran',
      key: 'terminPembayaran',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Status Pembayaran Termin',
      key: 'infoStatusPembayaran',
      render: (_: any, record: Kontrak) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag
            color={
              record.infoStatusPembayaran === 'Terbayar Semua'
                ? 'green'
                : 'red'
            }
          >
            {record.infoStatusPembayaran}
          </Tag>
          <Button size="small" onClick={() => handleEdit(record)}>
            Lihat Detail
          </Button>
        </div>
      ),
    },
    {
      title: 'Evaluasi Pembayaran',
      key: 'evaluasiPembayaran',
      render: (_: any, record: Kontrak) => (
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
    },
  ];

  const amandemenColumns: ColumnsType<AmandemenKontrak> = [
    {
      title: 'Nomor Amandemen',
      dataIndex: 'nomorAmandemen',
      key: 'nomorAmandemen',
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
    },
    {
      title: 'Deskripsi',
      dataIndex: 'deskripsi',
      key: 'deskripsi',
    },
  ];

  const peringatanColumns: ColumnsType<SuratPeringatan> = [
    {
      title: 'Nomor Surat',
      dataIndex: 'nomor',
      key: 'nomor',
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
    },
    {
      title: 'Alasan',
      dataIndex: 'alasan',
      key: 'alasan',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        style={{ marginBottom: 16 }}
      >
        Kembali
      </Button>

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
          scroll={{ x: "max-content" }}
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
        <Button type="primary" style={{ marginTop: 24 }} onClick={() => setShowInputAmandemenModal(true)}>
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
        <Button type="primary" style={{ marginTop: 24 }} onClick={() => setShowInputPeringatanModal(true)}>
          Input Surat Peringatan Baru
        </Button>
      </Card>

      {showModal && selectedRecord && (
        <ViewPembayaranModal
          visible={showModal}
          data={selectedRecord}
          onClose={() => setShowModal(false)}
        />
      )}

      {showEvaluasiModal && selectedRecord && (
        <EvaluasiVendorModal
          visible={showEvaluasiModal}
          data={selectedRecord}
          onClose={() => setShowEvaluasiModal(false)}
        />
      )}

      {showInputAmandemenModal && (
        <InputAmandemenModal
          visible={showInputAmandemenModal}
          onClose={() => setShowInputAmandemenModal(false)}
        />
      )}

      {showInputPeringatanModal && (
        <InputSuratPeringatanModal
          visible={showInputPeringatanModal}
          onClose={() => setShowInputPeringatanModal(false)}
        />
      )}
      
    </div>
  );
}