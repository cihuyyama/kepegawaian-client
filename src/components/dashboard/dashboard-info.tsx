'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import type {
  AnggotaKeluargaRow,
  InpasingRow,
  JabatanFungsionalRow,
  JabatanStrukturalRow,
  KepangkatanRow,
  RiwayatPendidikanRow,
} from './types';

import { DashboardKepangkatanTable } from './tables/dashboard-kepangkatan-table';
import { DashboardAnggotaKeluargaTable } from './tables/dashboard-anggota-keluarga-table';
import { DashboardRiwayatPendidikanTable } from './tables/dashboard-riwayat-pendidikan-table';
import { DashboardJabatanFungsionalTable } from './tables/dashboard-jabatan-fungsional-table';
import { DashboardInpasingTable } from './tables/dashboard-inpasing-table';
import { DashboardJabatanStrukturalTable } from './tables/dashboard-jabatan-struktural-table';

export function DashboardInfo({
  dataKepangkatan = [],
  dataAnggotaKeluarga = [],
  dataRiwayatPendidikan = [],
  dataJabatanFungsional = [],
  dataInpasing = [],
  dataJabatanStruktural = [],
}: {
  dataKepangkatan?: KepangkatanRow[];
  dataAnggotaKeluarga?: AnggotaKeluargaRow[];
  dataRiwayatPendidikan?: RiwayatPendidikanRow[];
  dataJabatanFungsional?: JabatanFungsionalRow[];
  dataInpasing?: InpasingRow[];
  dataJabatanStruktural?: JabatanStrukturalRow[]; // Ganti dengan tipe yang sesuai jika ada
}) {
  const [activeTab, setActiveTab] = useState<
    | 'kepangkatan'
    | 'anggotakeluarga'
    | 'riwayatpendidikan'
    | 'jabatanfungsional'
    | 'inpasing'
    | 'jabatanstruktural'
  >('kepangkatan');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Dashboard</CardTitle>
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
              | 'jabatanstruktural')
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
        </Tabs>
      </CardContent>
    </Card>
  );
}
