'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import type { AbsensiRow, CutiRow, GajiRow } from './types';
import { DashboardGajiTable } from './tables/dashboard-gaji-table';
import { DashboardCutiTable } from './tables/dashboard-cuti-table';
import { DashboardAbsensiTable } from './tables/dashboard-absensi-table';

export function DashboardInfo({
  dataAbsensi,
  dataCuti,
  dataGaji,
}: {
  dataAbsensi: AbsensiRow[];
  dataCuti: CutiRow[];
  dataGaji: GajiRow[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="absensi" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="absensi">Absensi</TabsTrigger>
            <TabsTrigger value="cuti">Cuti</TabsTrigger>
            <TabsTrigger value="gaji">Gaji</TabsTrigger>
          </TabsList>

          <TabsContent value="absensi" className="pt-4">
            <DashboardAbsensiTable data={dataAbsensi} />
          </TabsContent>

          <TabsContent value="cuti" className="pt-4">
            <DashboardCutiTable data={dataCuti} />
          </TabsContent>

          <TabsContent value="gaji" className="pt-4">
            <DashboardGajiTable data={dataGaji} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
