// src/components/dosen/dosen-detail.tsx
'use client';

import { DashboardProfileCard } from '@/components/dashboard/dashboard-profile-card';
import { DashboardInfo } from '@/components/dashboard/dashboard-info';
import type {
  Pegawai,
  KepangkatanRow,
  AnggotaKeluargaRow,
  RiwayatPendidikanRow,
  JabatanFungsionalRow,
  InpasingRow,
  JabatanStrukturalRow,
  PenempatanRow,
  KendaraanRow,
} from '@/types';
import { DosenProfileCard } from './dosen-profile-card';

export function DosenDetail({
  pegawai,
  kepangkatan,
  keluarga,
  pendidikan,
  jafung,
  inpasing,
  jastru,
  penempatan,
  kendaraan,
  role = 'kaprodi',
}: {
  pegawai: Pegawai;
  kepangkatan: KepangkatanRow[];
  keluarga: AnggotaKeluargaRow[];
  pendidikan: RiwayatPendidikanRow[];
  jafung: JabatanFungsionalRow[];
  inpasing: InpasingRow[];
  jastru: JabatanStrukturalRow[];
  penempatan: PenempatanRow[];
  kendaraan: KendaraanRow[];
  role?: string;
}) {
  return (
    <>
      <DashboardInfo
        role={role}
        dataKepangkatan={kepangkatan}
        dataAnggotaKeluarga={keluarga}
        dataRiwayatPendidikan={pendidikan}
        dataJabatanFungsional={jafung}
        dataInpasing={inpasing}
        dataJabatanStruktural={jastru}
        dataPenempatan={penempatan}
        dataKendaraan={kendaraan}
      />
    </>
  );
}
