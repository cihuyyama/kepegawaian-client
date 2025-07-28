// src/components/dashboard/dashboard-info.tsx
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '../ui/button';
import Link from 'next/link';

import type {
  AnggotaKeluargaRow,
  InpasingRow,
  JabatanFungsionalRow,
  JabatanStrukturalRow,
  KendaraanRow,
  KepangkatanRow,
  PenempatanRow,
  RiwayatPendidikanRow,
} from '@/types';
import { DashboardKepangkatanTable } from './tables/dashboard-kepangkatan-table';
import { DashboardAnggotaKeluargaTable } from './tables/dashboard-anggota-keluarga-table';
import { DashboardRiwayatPendidikanTable } from './tables/dashboard-riwayat-pendidikan-table';
import { DashboardJabatanFungsionalTable } from './tables/dashboard-jabatan-fungsional-table';
import { DashboardInpasingTable } from './tables/dashboard-inpasing-table';
import { DashboardJabatanStrukturalTable } from './tables/dashboard-jabatan-struktural-table';
import { DashboardPenempatanTable } from './tables/dashbaord-penempatan-table';
import { DashboardKendaraanTable } from './tables/dashboard-kendaraan-table';

export function DashboardInfo({
  role = '',
  userinfoId,
  userId,
  dataKepangkatan = [],
  dataAnggotaKeluarga = [],
  dataRiwayatPendidikan = [],
  dataJabatanFungsional = [],
  dataInpasing = [],
  dataJabatanStruktural = [],
  dataPenempatan = [],
  dataKendaraan = [],
}: {
  role?: string;
  userinfoId?: string;        // sekarang optional
  userId?: string;            // sekarang optional
  dataKepangkatan?: KepangkatanRow[];
  dataAnggotaKeluarga?: AnggotaKeluargaRow[];
  dataRiwayatPendidikan?: RiwayatPendidikanRow[];
  dataJabatanFungsional?: JabatanFungsionalRow[];
  dataInpasing?: InpasingRow[];
  dataJabatanStruktural?: JabatanStrukturalRow[];
  dataPenempatan?: PenempatanRow[];
  dataKendaraan?: KendaraanRow[];
}) {
  const [activeTab, setActiveTab] = useState<
    | 'kepangkatan'
    | 'anggotakeluarga'
    | 'riwayatpendidikan'
    | 'jabatanfungsional'
    | 'inpasing'
    | 'jabatanstruktural'
    | 'pelatihan'
    | 'penempatan'
    | 'kendaraan'
  >('kepangkatan');

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <CardTitle>Informasi Dashboard</CardTitle>

        {role === 'admin' && (
          <Link  href={`/users/userinfo/${userinfoId}/kepangkatan/add?userId=${userId}`}>
            <Button variant="success" className="text-sm">
              Tambah Data
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>

        {/* Dropdown untuk mobile */}
        <div className="block md:hidden mb-4">
          <select
            className="w-full border rounded px-3 py-2"
            value={activeTab}
            onChange={(e) =>
              setActiveTab(e.target.value as typeof activeTab)
            }
          >
            <option value="kepangkatan">Kepangkatan</option>
            <option value="anggotakeluarga">Anggota Keluarga</option>
            <option value="riwayatpendidikan">Riwayat Pendidikan</option>
            <option value="jabatanfungsional">Jabatan Fungsional</option>
            <option value="inpasing">Inpasing</option>
            <option value="jabatanstruktural">Jabatan Struktural</option>
            <option value="pelatihan">Pelatihan</option>
            <option value="penempatan">Penempatan</option>
            <option value="kendaraan">Kendaraan</option>
          </select>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as
              | 'kepangkatan'
              | 'anggotakeluarga'
              | 'riwayatpendidikan'
              | 'jabatanfungsional'
              | 'inpasing'
              | 'jabatanstruktural'
              | 'pelatihan'
              | 'penempatan'
              | 'kendaraan')
          }
          className="w-full"
        >
          {/* Tabs untuk desktop */}
          <TabsList className="hidden md:grid grid-cols-9 gap-1 mb-4">
            <TabsTrigger value="kepangkatan">Kepangkatan</TabsTrigger>
            <TabsTrigger value="anggotakeluarga">
              Anggota Keluarga
            </TabsTrigger>
            <TabsTrigger value="riwayatpendidikan">
              Riwayat Pendidikan
            </TabsTrigger>
            <TabsTrigger value="jabatanfungsional">
              Jabatan Fungsional
            </TabsTrigger>
            <TabsTrigger value="inpasing">
              Inpasing
            </TabsTrigger>
            <TabsTrigger value="jabatanstruktural">
              Jabatan Struktural
            </TabsTrigger>
            <TabsTrigger value="pelatihan">
              Pelatihan
            </TabsTrigger>
            <TabsTrigger value="penempatan">
              Penempatan
            </TabsTrigger>
            <TabsTrigger value="kendaraan">
              Kendaraan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kepangkatan" className="pt-4">
            <DashboardKepangkatanTable data={dataKepangkatan} />
          </TabsContent>

          <TabsContent value="anggotakeluarga" className="pt-4">
            <DashboardAnggotaKeluargaTable data={dataAnggotaKeluarga} />
          </TabsContent>

          <TabsContent value="riwayatpendidikan" className="pt-4">
            <DashboardRiwayatPendidikanTable data={dataRiwayatPendidikan} />
          </TabsContent>

          <TabsContent value="jabatanfungsional" className="pt-4">
            <DashboardJabatanFungsionalTable
              data={dataJabatanFungsional}
            />
          </TabsContent>

          <TabsContent value="inpasing" className="pt-4">
            <DashboardInpasingTable data={dataInpasing} />
          </TabsContent>

          <TabsContent value="jabatanstruktural" className="pt-4">
            <DashboardJabatanStrukturalTable data={dataJabatanStruktural} />
          </TabsContent>

          <TabsContent value="penempatan" className="pt-4">
            <DashboardPenempatanTable data={dataPenempatan} />
          </TabsContent>

          <TabsContent value="kendaraan" className="pt-4">
            <DashboardKendaraanTable data={dataKendaraan} />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
