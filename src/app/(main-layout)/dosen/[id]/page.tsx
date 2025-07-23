'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { DosenBreadcrumb } from '@/components/dosen/dosen-breadcrumb';
import { DosenDetail } from '@/components/dosen/dosen-detail';
import { DosenProfileCard } from '@/components/dosen/dosen-profile-card';

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

import { buildDoc } from '@/utils/documents';
import { BASE_URL } from '@/constant/BaseURL';

/* ==== mapper sama seperti di list page ==== */
const mapToPegawai = (r: any): Pegawai => ({
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
  nbm: r.NBM || undefined,
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
  dokNbm: buildDoc(r.userId, 'DocNBM', r.DocNBM),
  dokPassport: buildDoc(r.userId, 'Passport', r.Passport),
  dokBpjsKesehatan: buildDoc(r.userId, 'BPJSKesehatan', r.BPJSKesehatan),
  dokBpjsTenagakerja: buildDoc(r.userId, 'BPJSKetenagakerjaan', r.BPJSKetenagakerjaan),
  dokSertifikasiDosen: buildDoc(r.userId, 'SertifikasiDosen', r.SertifikasiDosen),
  dokNidn: buildDoc(r.userId, 'DocNIDN', r.DocNIDN),

  imgUrl: r.user.imgUrl
});
const normalizeNip = (nip: string) => nip.replace(/\s+/g, '');
/* ========================================= */

export default function DosenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nipFromUrl = decodeURIComponent(id);
  const nipNormalized = normalizeNip(nipFromUrl);

  const [role, setRole] = useState<string>('');
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);
  const [loading, setLoading] = useState(true);

  // sementara tabel lain kosong (isi kalau sudah ada API-nya)
  const kepangkatan: KepangkatanRow[] = [];
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
        const [roleRes, listRes] = await Promise.all([
          fetch(`${BASE_URL}/users/access-token`, { credentials: 'include' }),
          fetch(`${BASE_URL}/userinfo`, { credentials: 'include' }),
        ]);

        const roleJson = await roleRes.json();
        setRole(roleJson.data?.role ?? '');

        const listJson = await listRes.json();
        const arr = listJson.data || [];
        const foundRaw = arr.find((r: any) => normalizeNip(r.NIP ?? '') === nipNormalized);
        setPegawai(foundRaw ? mapToPegawai(foundRaw) : null);
      } catch (e) {
        console.error(e);
        setPegawai(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [nipNormalized]);

  if (loading) {
    return (
      <ContentLayout title="Detail Dosen">
        <p className="mt-6 text-gray-500">Memuat...</p>
      </ContentLayout>
    );
  }

  if (!pegawai) {
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
        <DosenProfileCard pegawai={pegawai} />

        <DosenDetail
          pegawai={pegawai}
          kepangkatan={kepangkatan}
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
