"use client";

import { useRouter } from "next/navigation";
import { Typography, Table, Card, Button, Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import type { Vendor } from "@/app/types";
import { useState } from "react";

const { Title } = Typography;

const data: Vendor[] = [
  {
    key: "1",
    namaVendor: "PT Akhdani Reka Solusi (Akhdani)",
    nilaiKeseluruhan: 92,
    evaluasiVendor: 4.6,
    suratPeringatan: "Tidak ada",
    totalProyek: 12,
  },
  {
    key: "2",
    namaVendor: "PT Indocyber Global Teknologi (IGLO)",
    nilaiKeseluruhan: 80,
    evaluasiVendor: 4.0,
    suratPeringatan: "Ada",
    totalProyek: 8,
  },
  {
    key: "3",
    namaVendor: "PT Duta Digital Nusantara (DDN)",
    nilaiKeseluruhan: 85,
    evaluasiVendor: 4.2,
    suratPeringatan: "Tidak ada",
    totalProyek: 10,
  },
  {
    key: "4",
    namaVendor: "PT Ecomindo Saranacipta (Ecomindo)",
    nilaiKeseluruhan: 78,
    evaluasiVendor: 3.9,
    suratPeringatan: "Ada",
    totalProyek: 6,
  },
];

export default function DaftarVendorPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleClick = (record: Vendor) => {
    router.push(`/daftarVendor/${record.key}`);
  };

  const getColumnSearchProps = (dataIndex: keyof Vendor): any => {
    const isNumeric =
      dataIndex === "nilaiKeseluruhan" ||
      dataIndex === "evaluasiVendor" ||
      dataIndex === "totalProyek";

    if (isNumeric) {
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }: any) => {
          const [min = "", max = ""] = selectedKeys[0] || [];
          return (
            <div style={{ padding: 8 }}>
              <Input
                placeholder="Min"
                type="number"
                min={0}
                value={min}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedKeys([[val, max]]);
                }}
                style={{ width: 80, marginBottom: 8, marginRight: 8 }}
              />
              <Input
                placeholder="Max"
                type="number"
                min={0}
                value={max}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedKeys([[min, val]]);
                }}
                style={{ width: 80, marginBottom: 8 }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    const minNum = Number(min);
                    const maxNum = Number(max);
                    if (
                      !isNaN(minNum) &&
                      !isNaN(maxNum) &&
                      minNum <= maxNum &&
                      minNum >= 0 &&
                      maxNum >= 0
                    ) {
                      confirm();
                      setSearchedColumn(dataIndex);
                    }
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
          );
        },
        onFilter: (value: any, record: Vendor) => {
          const [minStr, maxStr] = value || [];
          const min = Number(minStr);
          const max = Number(maxStr);
          const recordVal = Number(record[dataIndex]);
          if (!isNaN(min) && !isNaN(max) && min >= 0 && max >= 0) {
            return recordVal >= min && recordVal <= max;
          }
          return true;
        },
      };
    }

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div>
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
      onFilter: (value: string, record: Vendor) =>
        String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
    };
  };

  const columns: ColumnsType<Vendor> = [
    {
      title: "Nama Vendor",
      dataIndex: "namaVendor",
      key: "namaVendor",
      ...getColumnSearchProps("namaVendor"),
    },
    {
      title: "Nilai Keseluruhan",
      dataIndex: "nilaiKeseluruhan",
      key: "nilaiKeseluruhan",
      sorter: (a, b) => a.nilaiKeseluruhan - b.nilaiKeseluruhan,
      ...getColumnSearchProps("nilaiKeseluruhan"),
    },
    {
      title: "Evaluasi Vendor",
      dataIndex: "evaluasiVendor",
      key: "evaluasiVendor",
      sorter: (a, b) => a.evaluasiVendor - b.evaluasiVendor,
      ...getColumnSearchProps("evaluasiVendor"),
    },
    {
      title: "Surat Peringatan",
      dataIndex: "suratPeringatan",
      key: "suratPeringatan",
      filters: [
        { text: "Ada", value: "Ada" },
        { text: "Tidak ada", value: "Tidak ada" },
      ],
      onFilter: (value, record) => record.suratPeringatan === value,
    },
    {
      title: "Total Proyek",
      dataIndex: "totalProyek",
      key: "totalProyek",
      sorter: (a, b) => a.totalProyek - b.totalProyek,
      ...getColumnSearchProps("totalProyek"),
    },
    {
      title: "Lihat Vendor",
      dataIndex: "key",
      key: "key",
      render: (_: any, record: Vendor) => (
        <Button type="primary" onClick={() => handleClick(record)}>
          Lihat Detil
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3} style={{ marginBottom: 24 }}>
          View Monitoring Vendor
        </Title>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          rowKey="key"
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
}
