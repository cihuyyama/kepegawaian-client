'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { DashboardBreadcrumb } from '@/components/dashboard/dashboard-breadcrumb';
import { DashboardInfo } from '@/components/dashboard/dashboard-info';
import { DashboardProfileCard } from '@/components/dashboard/dashboard-profile-card';

export default function DashboardPage() {
  const pegawai = {
    nama: "Budi Santoso",
    nip: "198706172019031002",
    jabatan: "Dosen Tetap",
    golongan: "III/B",
    unit: "Fakultas Teknik",
    status: "Aktif",
    email: "budi@universitas.ac.id",
    foto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D",
  };

  // Data dummy
  const dataAbsensi = [
    { tanggal: "2025-06-01", masuk: "08:00", pulang: "16:00" },
    { tanggal: "2025-06-02", masuk: "08:05", pulang: "16:10" },
  ];
  const dataCuti = [
    { jenis: "Tahunan", mulai: "2025-07-10", sampai: "2025-07-14", status: "Disetujui" },
  ];
  const dataGaji = [
    { bulan: "Mei 2025", pokok: "8.000.000", tunjangan: "2.000.000" },
  ];

  return (
    <ContentLayout title="Dashboard">
      <DashboardBreadcrumb />
      <div className="mt-6 w-full space-y-6">
        <DashboardProfileCard pegawai={pegawai} />
        <DashboardInfo
          dataAbsensi={dataAbsensi}
          dataCuti={dataCuti}
          dataGaji={dataGaji}
        />
      </div>
    </ContentLayout>
  );
}
