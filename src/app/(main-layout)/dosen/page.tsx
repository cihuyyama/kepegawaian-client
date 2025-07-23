'use client';

import { useEffect, useMemo, useState } from 'react';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DosenListToolbar } from '@/components/dosen/dosen-list-toolbar';
import { DosenListTable } from '@/components/dosen/dosen-list-table';
import { DosenBreadcrumb } from '@/components/dosen/dosen-breadcrumb';

import type { Pegawai } from '@/types';
import { buildDoc } from '@/utils/documents';
import { BASE_URL } from '@/constant/BaseURL';

/* ================== MAPPER: API → Pegawai =================== */
const mapToPegawai = (r: any): Pegawai => ({
  nip: r.NIP ?? '',
  nama: r.user?.username ?? '',
  gelarDepan: r.GelarDepan || undefined,
  gelarBelakang: r.GelarBelakang || undefined,
  jenisKelamin: r.JenisKelamin ?? '',
  agama: '',                          // tidak ada di response
  golonganDarah: undefined,           // tidak ada di response
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
/* ============================================================ */

// normalisasi nip agar URL tidak bermasalah karena spasi
const normalizeNip = (nip: string) => nip.replace(/\s+/g, '');

export default function DosenPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Pegawai[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // Ambil role
        const roleRes = await fetch(`${BASE_URL}/users/access-token`, { credentials: 'include' });
        const roleJson = await roleRes.json();
        setRole(roleJson.data?.role ?? null);

        // Ambil list userinfo
        const res = await fetch(`${BASE_URL}/userinfo`, { credentials: 'include' });
        const json = await res.json();
        const mapped: Pegawai[] = (json.data || []).map(mapToPegawai);
        setData(mapped);
      } catch (e) {
        console.error(e);
        setRole(null);
        setData([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredData = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter((d) =>
      [d.nama, d.nip, d.jabatanFungsional ?? '', d.emailUniversitas, d.noHandphone]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  if (loading) return <p className="p-6 text-gray-500">Memuat...</p>;
  if (role !== 'kaprodi' && role !== 'admin')
    return <p className="p-6 text-red-500">Anda tidak memiliki akses.</p>;

  return (
    <ContentLayout title="Daftar Dosen">
      <DosenBreadcrumb />
      <Card className="mt-6">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <CardTitle>Daftar Dosen</CardTitle>
          <DosenListToolbar query={query} onQueryChange={setQuery} />
        </CardHeader>
        <CardContent>
          <DosenListTable data={filteredData} makeId={normalizeNip} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
