'use client';

import { useState } from 'react';
import { Table, Typography, Tag, Card, Button, Input, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from "@ant-design/icons";
import { Kontrak } from '@/app/types';
import ViewPembayaranModal from '@/app/components/ViewPembayaran';
import EvaluasiVendorModal from '@/app/components/EvaluasiVendor';
import DataDashboard from '@/app/components/DataDashboard';
import { motion, AnimatePresence } from 'framer-motion';

const { Title } = Typography;

const data: Kontrak[] = [
  {
    key: "1",
    namaPekerjaan: "Implementasi e-Document Management System",
    tipePekerjaan: "Pengembangan / Change Request",
    direksiPekerjaan: "Ahmad Fauzi",
    pengawasPekerjaan: "Nina Rachmawati",
    vendorKHS: "PT Akhdani Reka Solusi (Akhdani)",
    // nilaiTotal: "Rp2.000.000.000",
    nilaiTotal: 2000000000,
    nomorKontrak: "K-A1312",
    nomorAmandemenKontrak: "-",
    tanggalMulai: "05/01/2024",
    tanggalSelesai: "30/06/2024",
    terminPembayaran: "Termin 3",
    infoStatusPembayaran: "Terbayar Semua",
    dataStatusPembayaran: {
      1: { status: "Terbayar", dokumen: ["kwitansi1.pdf"] },
      2: { status: "Terbayar", dokumen: ["kwitansi2.pdf"] },
      3: { status: "Terbayar", dokumen: ["kwitansi3.pdf"] },
    },
  },
  {
    key: "2",
    namaPekerjaan: "Pemeliharaan Aplikasi HRIS 2024",
    tipePekerjaan: "Pemeliharaan / Ophar",
    direksiPekerjaan: "Rizal Maulana",
    pengawasPekerjaan: "Dewi Lestari",
    vendorKHS: "PT Indocyber Global Teknologi (IGLO)",
    // nilaiTotal: "Rp1.200.000.000",
    nilaiTotal: 1200000000,
    nomorKontrak: "K-B7152",
    nomorAmandemenKontrak: "-",
    tanggalMulai: "01/02/2024",
    tanggalSelesai: "31/12/2024",
    terminPembayaran: "Termin 1",
    infoStatusPembayaran: "Belum Terbayar Semua",
    dataStatusPembayaran: {
      1: { status: "Belum Terbayar" },
      2: { status: "Belum Terbayar" },
      3: { status: "Belum Terbayar" },
      4: { status: "Belum Terbayar" },
      5: { status: "Belum Terbayar" },
      6: { status: "Belum Terbayar" },
    },
  },
  {
    key: "3",
    namaPekerjaan: "Pengembangan Modul e-Lelang Terintegrasi",
    tipePekerjaan: "Pengembangan / Change Request",
    direksiPekerjaan: "Dimas Saputra",
    pengawasPekerjaan: "Tiara Anggraini",
    vendorKHS: "PT Duta Digital Nusantara (DDN)",
    // nilaiTotal: "Rp950.000.000",
    nilaiTotal: 950000000,
    nomorKontrak: "K-A1112",
    nomorAmandemenKontrak: "REV-A1112",
    tanggalMulai: "10/03/2024",
    tanggalSelesai: "10/09/2024",
    terminPembayaran: "Termin 3",
    infoStatusPembayaran: "Terbayar Sebagian",
    dataStatusPembayaran: {
      1: { status: "Terbayar", dokumen: ["kwitansi1.pdf"] },
      2: { status: "Terbayar", dokumen: ["kwitansi2.pdf"] },
      3: { status: "Belum Terbayar" },
      4: { status: "Belum Terbayar" },
    },
  },
  {
    key: "4",
    namaPekerjaan: "Support & Maintenance Aplikasi Keuangan",
    tipePekerjaan: "Pemeliharaan / Ophar",
    direksiPekerjaan: "Bayu Pratama",
    pengawasPekerjaan: "Laras Wulandari",
    vendorKHS: "PT Ecomindo Saranacipta (Ecomindo)",
    // nilaiTotal: "Rp800.000.000",
    nilaiTotal: 800000000,
    nomorKontrak: "K-C6001",
    nomorAmandemenKontrak: "REV-C6001",
    tanggalMulai: "01/01/2024",
    tanggalSelesai: "31/12/2024",
    terminPembayaran: "Termin 3",
    infoStatusPembayaran: "Terbayar Sebagian",
    dataStatusPembayaran: {
      1: { status: "Terbayar", dokumen: ["kwitansi1.pdf"] },
      2: { status: "Terbayar", dokumen: ["kwitansi2.pdf"] },
      3: { status: "Belum Terbayar" },
      4: { status: "Belum Terbayar" },
      5: { status: "Belum Terbayar" },
      6: { status: "Belum Terbayar" },
    },
  },
  {
    key: "5",
    namaPekerjaan: "Pengembangan Sistem ERP Terintegrasi",
    tipePekerjaan: "Pengembangan / Change Request",
    direksiPekerjaan: "Siti Nurhaliza",
    pengawasPekerjaan: "Rian Prasetyo",
    vendorKHS: "PT Solusi Digital Nusantara (SDN)",
    // nilaiTotal: "Rp5.000.000.000",
    nilaiTotal: 5000000000,
    nomorKontrak: "K-D2401",
    nomorAmandemenKontrak: "-",
    tanggalMulai: "01/01/2024",
    tanggalSelesai: "31/12/2025",
    terminPembayaran: "Termin 24",
    infoStatusPembayaran: "Belum Terbayar Semua",
    dataStatusPembayaran: {
      1: { status: "Belum Terbayar" },
      2: { status: "Belum Terbayar" },
      3: { status: "Belum Terbayar" },
      4: { status: "Belum Terbayar" },
      5: { status: "Belum Terbayar" },
      6: { status: "Belum Terbayar" },
      7: { status: "Belum Terbayar" },
      8: { status: "Belum Terbayar" },
      9: { status: "Belum Terbayar" },
      10: { status: "Belum Terbayar" },
      11: { status: "Belum Terbayar" },
      12: { status: "Belum Terbayar" },
      13: { status: "Belum Terbayar" },
      14: { status: "Belum Terbayar" },
      15: { status: "Belum Terbayar" },
      16: { status: "Belum Terbayar" },
      17: { status: "Belum Terbayar" },
      18: { status: "Belum Terbayar" },
      19: { status: "Belum Terbayar" },
      20: { status: "Belum Terbayar" },
      21: { status: "Belum Terbayar" },
      22: { status: "Belum Terbayar" },
      23: { status: "Belum Terbayar" },
      24: { status: "Belum Terbayar" },
    },
  },
];

  export default function DaftarKontrakPage() {
    const [showModal, setShowModal] = useState(false);
    const [showEvaluasiModal, setShowEvaluasiModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<Kontrak | null>(null);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const handleEdit = (record: Kontrak) => {
      setSelectedRecord(record);
      setShowModal(true);
    };

    const formatRupiah = (number: number): string => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(number);
    };

    const getColumnSearchProps = (dataIndex: keyof Kontrak): any => {
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: any) => (
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
              style={{ width: 188, marginBottom: 8, display: "block" }}
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
                  clearFilters();
                  confirm();
                  setSearchText("");
                }}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        onFilter: (value: string, record: Kontrak) =>
          String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
      };
    };

  const columns: ColumnsType<Kontrak> = [
    {
      title: "Nama Pekerjaan",
      dataIndex: "namaPekerjaan",
      key: "namaPekerjaan",
      ...getColumnSearchProps("namaPekerjaan"),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Tipe Pekerjaan",
      dataIndex: "tipePekerjaan",
      key: "tipePekerjaan",
      filters: Array.from(new Set(data.map((item) => item.tipePekerjaan))).map(
        (type) => ({
          text: type,
          value: type,
        })
      ),
      onFilter: (value, record) => record.tipePekerjaan === value,
      render: (tipe) => (
        <Tag color={tipe.includes("Pengembangan") ? "geekblue" : "volcano"}>
          {tipe}
        </Tag>
      ),
    },
    {
      title: "Direksi Pekerjaan",
      dataIndex: "direksiPekerjaan",
      key: "direksiPekerjaan",
      ...getColumnSearchProps("direksiPekerjaan"),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Pengawas Pekerjaan",
      dataIndex: "pengawasPekerjaan",
      key: "pengawasPekerjaan",
      ...getColumnSearchProps("pengawasPekerjaan"),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Vendor KHS",
      dataIndex: "vendorKHS",
      key: "vendorKHS",
      ...getColumnSearchProps("vendorKHS"),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Nilai Total",
      dataIndex: "nilaiTotal",
      key: "nilaiTotal",
      sorter: (a, b) => a.nilaiTotal - b.nilaiTotal,
      render: (value: number) => (
        <span style={{ color: "#389e0d" }}>{formatRupiah(value)}</span>
      ),
      // render: (value) => <span style={{ color: "#389e0d" }}>{value}</span>,
    },
    {
      title: "Nomor Kontrak",
      dataIndex: "nomorKontrak",
      key: "nomorKontrak",
      ...getColumnSearchProps("nomorKontrak"),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Nomor Amandemen Kontrak",
      dataIndex: "nomorAmandemenKontrak",
      key: "nomorAmandemenKontrak",
      ...getColumnSearchProps("nomorAmandemenKontrak"),
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Mulai Kontrak",
      dataIndex: "tanggalMulai",
      key: "tanggalMulai",
    },
    {
      title: "Selesai Kontrak",
      dataIndex: "tanggalSelesai",
      key: "tanggalSelesai",
    },
    {
      title: "Termin Pembayaran Saat Ini",
      dataIndex: "terminPembayaran",
      key: "terminPembayaran",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Status Pembayaran Termin",
      key: "infoStatusPembayaran",
      width: 220,
      filters: Array.from(
        new Set(data.map((item) => item.infoStatusPembayaran))
      ).map((type) => ({
        text: type,
        value: type,
      })),
      onFilter: (value, record) => record.infoStatusPembayaran === value,
      render: (_: any, record: Kontrak) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag
            color={
              record.infoStatusPembayaran === "Terbayar Semua"
                ? "green"
                : record.infoStatusPembayaran === "Belum Terbayar Semua"
                ? "red"
                : record.infoStatusPembayaran?.includes("Pengembangan")
                ? "geekblue"
                : "volcano"
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
      title: "Evaluasi Pembayaran",
      key: "evaluasiPembayaran",
      render: (_: any, record: Kontrak) => (
        <Button
          type="primary"
          onClick={() => {
            if (record.infoStatusPembayaran === "Terbayar Semua") {
              setSelectedRecord(record);
              setShowEvaluasiModal(true);
            }
          }}
          disabled={record.infoStatusPembayaran !== "Terbayar Semua"}
        >
          Evaluasi
        </Button>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: 24 }}
    >
      <Card>
        <Title level={3} style={{ marginBottom: 24 }}>
          View Monitoring Kontrak
        </Title>
        <DataDashboard />
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          rowKey="key"
          scroll={{ x: "max-content" }}
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
