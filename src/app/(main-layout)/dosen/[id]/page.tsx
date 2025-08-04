// src/app/(main-layout)/dosen/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { DosenBreadcrumb } from '@/components/dosen/dosen-breadcrumb';
import { DosenDetail } from '@/components/dosen/dosen-detail';

import type {
  Pegawai,
  AnggotaKeluargaRow,
  RiwayatPendidikanRow,
  JabatanFungsionalRow,
  InpasingRow,
  JabatanStrukturalRow,
  PenempatanRow,
  KendaraanRow,
} from '@/types';

import { buildDoc } from '@/utils/documents';
import { BASE_URL } from '@/constant/BaseURL';

const mapToPegawai = (r: any): Pegawai => ({
  id: r.userId,
  nip: r.NIP ?? '',
  nama: r.user?.username ?? '',
  gelarDepan: r.GelarDepan || undefined,
  gelarBelakang: r.GelarBelakang || undefined,
  jenisKelamin: r.JenisKelamin ?? '',
  agama: '',
  golonganDarah: undefined,
  tempatLahir: r.TempatLahir ?? '',
  tanggalLahir: r.TanggalLahir ?? '',
  alamat: r.Alamat ?? '',
  noHandphone: r.Phone ?? '',
  nidn: r.NIDN || undefined,
  nidk: r.NIDK || undefined,
  nuptk: r.NUPTK || undefined,
  idScholar: r.IDScholar || undefined,
  idScopus: r.IDScopus || undefined,
  idShinta: r.IDShinta || undefined,
  idGaruda: r.IDGaruda || undefined,
  npwp: r.NPWP || undefined,
  emailPribadi: r.WorkEmail ?? '',
  emailUniversitas: r.user?.email ?? '',
  nikKependudukan: r.NIK ?? '',
  jabatanStruktural: r.JabatanStruktural || undefined,
  jabatanFungsional: r.JabatanFungsional || undefined,

  dokKtp: buildDoc(r.userId, 'KTP', r.KTP),
  dokPassport: buildDoc(r.userId, 'Passport', r.Passport),
  dokBpjsKesehatan: buildDoc(r.userId, 'BPJSKesehatan', r.BPJSKesehatan),
  dokBpjsTenagakerja: buildDoc(r.userId, 'BPJSKetenagakerjaan', r.BPJSKetenagakerjaan),
  dokSertifikasiDosen: buildDoc(r.userId, 'SertifikasiDosen', r.SertifikasiDosen),
  dokNidn: buildDoc(r.userId, 'DocNIDN', r.DocNIDN),

  imgUrl: r.user?.imgUrl ?? '',
});

const normalizeNip = (nip: string) => nip.replace(/\s+/g, '');

export default function DosenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nipFromUrl = decodeURIComponent(id);
  const nipNormalized = normalizeNip(nipFromUrl);

  const [role, setRole] = useState<string>('');
  const [rawData, setRawData] = useState<any>(null);
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);
  const [loading, setLoading] = useState(true);

  // tabel–tabel lain masih kosong
  const keluarga: AnggotaKeluargaRow[] = [];
  const pendidikan: RiwayatPendidikanRow[] = [];
  const jafung: JabatanFungsionalRow[] = [];
  const inpasing: InpasingRow[] = [];
  const jastru: JabatanStrukturalRow[] = [];
  const penempatan: PenempatanRow[] = [];
  const kendaraan: KendaraanRow[] = [];

  useEffect(() => {
    (async () => {
      try {
        // 1. load role
        const roleRes = await fetch(`${BASE_URL}/users/access-token`, { credentials: 'include' });
        const roleJson = await roleRes.json();
        setRole(roleJson.data?.role ?? '');

        const userId = decodeURIComponent(id);

        // 2a. kalau backend support single‐fetch:
        // const detailRes = await fetch(`${BASE_URL}/userinfo/${userId}`, { credentials: 'include' });
        // const detailJson = await detailRes.json();
        // const foundRaw = detailJson.data;

        // 2b. kalau belum, fetch list dan filter:
        const listRes = await fetch(`${BASE_URL}/userinfo`, { credentials: 'include' });
        const listJson = await listRes.json();
        const arr = listJson.data || [];
        const foundRaw = arr.find((r: any) => r.userId === userId) ?? null;

        setRawData(foundRaw);
        setPegawai(foundRaw ? mapToPegawai(foundRaw) : null);
      } catch (e) {
        console.error(e);
        setRawData(null);
        setPegawai(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);


  if (loading) {
    return (
      <ContentLayout title="Detail Dosen">
        <p className="mt-6 text-gray-500">Memuat...</p>
      </ContentLayout>
    );
  }

  if (!pegawai || !rawData) {
    return (
      <ContentLayout title="Detail Dosen">
        <p className="mt-6 text-red-500">Data dosen tidak ditemukan.</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Detail Dosen">
      <DosenBreadcrumb page="Detail" />

      <div className="mt-6 w-full space-y-6">
        <DosenDetail
          userId={rawData.userId}
          pegawai={pegawai}
          keluarga={keluarga}
          pendidikan={pendidikan}
          jafung={jafung}
          inpasing={inpasing}
          jastru={jastru}
          penempatan={penempatan}
          kendaraan={kendaraan}
          role={role}
        />
      </div>
    </ContentLayout>
  );
}
