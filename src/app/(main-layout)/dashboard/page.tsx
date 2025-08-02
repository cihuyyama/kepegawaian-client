'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { DashboardBreadcrumb } from '@/components/dashboard/dashboard-breadcrumb';
import { DashboardInfo } from '@/components/dashboard/dashboard-info';

import {
  Pegawai,
  AnggotaKeluargaRow,
  InpasingRow,
  JabatanFungsionalRow,
  JabatanStrukturalRow,
  KendaraanRow,
  PenempatanRow,
  RiwayatPendidikanRow,
  KepangkatanRow
} from '@/types';

import { BASE_URL } from '@/constant/BaseURL';
import { buildDoc } from '@/utils/documents';
import { DashboardProfileCard } from '@/components/dashboard/dashboard-profile-card';

export default function DashboardPage() {
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [dataKepangkatan, setDataKepangkatan] = useState<KepangkatanRow[]>([]);
  const [dataAnggotaKeluarga, setDataAnggotaKeluarga] = useState<AnggotaKeluargaRow[]>([]);
  const [dataRiwayatPendidikan, setDataRiwayatPendidikan] = useState<RiwayatPendidikanRow[]>([]);
  const [dataJabatanFungsional, setDataJabatanFungsional] = useState<JabatanFungsionalRow[]>([]);
  const [dataInpasing, setDataInpasing] = useState<InpasingRow[]>([]);
  const [dataJabatanStruktural, setDataJabatanStruktural] = useState<JabatanStrukturalRow[]>([]);
  const [dataPenempatan, setDataPenempatan] = useState<PenempatanRow[]>([]);
  const [dataKendaraan, setDataKendaraan] = useState<KendaraanRow[]>([]);

  const [loading, setLoading] = useState(true);

  // helper tanggal
  const fmtDDMMYYYY = (iso?: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const toPublicUrl = (p?: string) => {
    if (!p) return undefined;
    // handle backslash Windows path → URL
    const cleaned = p.split('public\\')[1]?.replace(/\\/g, '/')
                ?? p.split('public/')[1];
    return cleaned
      ? `${process.env.NEXT_PUBLIC_DOMAIN}/${cleaned}`
      : `${process.env.NEXT_PUBLIC_DOMAIN}/${p}`;
  };

  // 1) Ambil access-token → profil dasar + role + userId
  useEffect(() => {
    const fetchPegawai = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/users/access-token`, {
          withCredentials: true
        });

        const data = res.data?.data;
        const info = data?.UserInfo || {};
        const uid: string = data?.id;

        const pegawaiData: Pegawai = {
          nip: info.NIP ?? '-',
          nama: data.username ?? '-',
          gelarDepan: info.GelarDepan ?? '',
          gelarBelakang: info.GelarBelakang ?? '',
          jenisKelamin: info.JenisKelamin ?? '-',
          agama: '-',                // tidak ada di API
          golonganDarah: '-',        // tidak ada di API
          tempatLahir: info.TempatLahir ?? '-',
          tanggalLahir: info.TanggalLahir
            ? new Date(info.TanggalLahir).toISOString().split('T')[0]
            : '-',
          alamat: info.Alamat ?? '-',
          noHandphone: info.Phone ?? '-',
          nbm: info.NBM ?? '-',
          nidn: info.NIDN ?? '-',
          nidk: info.NIDK ?? '-',
          nuptk: info.NUPTK ?? '-',
          idScholar: info.IDScholar ?? '-',
          idScopus: info.IDScopus ?? '-',
          idShinta: info.IDShinta ?? '-',
          idGaruda: info.IDGaruda ?? '-',
          npwp: info.NPWP ?? '-',
          emailPribadi: info.WorkEmail ?? '-',
          emailUniversitas: data.email ?? '-',
          nikKependudukan: info.NIK ?? '-',
          jabatanStruktural: info.JabatanStruktural ?? '-',
          jabatanFungsional: info.JabatanFungsional ?? '-',

          // Dokumen pakai builder
          dokKtp: buildDoc(uid, 'KTP', info.KTP),
          dokNbm: buildDoc(uid, 'DocNBM', info.DocNBM),
          dokPassport: buildDoc(uid, 'Passport', info.Passport),
          dokBpjsKesehatan: buildDoc(uid, 'BPJSKesehatan', info.BPJSKesehatan),
          dokBpjsTenagakerja: buildDoc(uid, 'BPJSKetenagakerjaan', info.BPJSKetenagakerjaan),
          dokSertifikasiDosen: buildDoc(uid, 'SertifikasiDosen', info.SertifikasiDosen),
          dokNidn: buildDoc(uid, 'DocNIDN', info.DocNIDN),

          imgUrl: data.imgUrl
        };

        setPegawai(pegawaiData);
        setUserRole(data.role || null);
        setUserId(uid);
      } catch (error) {
        console.error('Gagal mengambil data pegawai:', error);
        setPegawai(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPegawai();
  }, []);

  // 2) Setelah userId ada → fetch semua tabel paralel
  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const [
          kepRes,
          kelRes,
          pendRes,
          jafRes,
          inpRes,
          jasRes,
          penRes,
          kenRes,
        ] = await Promise.all([
          // kepangkatan (semua user → filter)
          fetch(`${BASE_URL}/kepangkatan`, { credentials: 'include' }),
          // keluarga by user
          fetch(`${BASE_URL}/keluargauser/${userId}`, { credentials: 'include' }),
          // pendidikan by user
          fetch(`${BASE_URL}/pendidikan/user/${userId}`, { credentials: 'include' }),
          // jabatan fungsional (semua user → filter)
          fetch(`${BASE_URL}/jabatan-fungsional`, { credentials: 'include' }),
          // inpasing by user
          fetch(`${BASE_URL}/inpasing/user/${userId}`, { credentials: 'include' }),
          // jabatan struktural by user
          fetch(`${BASE_URL}/jabatan-struktural/user/${userId}`, { credentials: 'include' }),
          // penempatan by user
          fetch(`${BASE_URL}/penempatan/user/${userId}`, { credentials: 'include' }),
          // kendaraan by user
          fetch(`${BASE_URL}/kendaraan/user/${userId}`, { credentials: 'include' }),
        ]);

        // --- Kepangkatan
        if (kepRes.ok) {
          const j = await kepRes.json();
          const items: any[] = j.data || [];
          const filtered = items.filter(it => it.userId === userId);
          const mapped: KepangkatanRow[] = filtered.map(it => ({
            id: it.id,
            kepangkatan: it.nama,
            noSK: it.NomorSK,
            tglSK: fmtDDMMYYYY(it.TanggalSK),
            tmt: fmtDDMMYYYY(it.TMT),
            tglAkhirKontrak: it.TanggalAkhirKontrak ? fmtDDMMYYYY(it.TanggalAkhirKontrak) : '-',
            jenisSK: it.JenisSK,
            gajiPokok: it.GajiPokok,
            docId: it.id,
            originalName: it.DokumenSK?.originalName,
            dokumenSK: it.DokumenSK?.path ? toPublicUrl(it.DokumenSK.path) : undefined,
            mulaiMasaKerja: false,
          }));
          setDataKepangkatan(mapped);
        }

        // --- Keluarga
        if (kelRes.ok) {
          const j = await kelRes.json();
          const items: any[] = j.data || [];
          const mapped: AnggotaKeluargaRow[] = items.map(it => ({
            id: it.id,
            nama: it.nama,
            tempatLahir: it.tempatLahir,
            agama: it.agama,
            jenisKelamin: it.jenisKelamin,
            nik: it.nik,
            pendidikan: it.pendidikan,
            hubunganKeluarga: it.hubunganKeluarga,
            tunjanganBeras: it.tunjanganBeras,
            tunjanganKeluarga: it.tunjanganKeluarga,
            potonganAsuransi: it.potonganAsuransi,
            tanggunganPajak: it.tanggunganPajak,
          }));
          setDataAnggotaKeluarga(mapped);
        }

        // --- Pendidikan
        if (pendRes.ok) {
          const j = await pendRes.json();
          const items: any[] = j.data || [];
          const mapped: RiwayatPendidikanRow[] = items.map(it => ({
            id: it.id,
            userId: it.userId,
            pendidikan: it.pendidikan,
            namaInstitusi: it.namaInstitusi,
            tahunLulus: String(it.tahunLulus),
            dokumen: [], // backend belum kembalikan list dokumen pendidikan
          }));
          setDataRiwayatPendidikan(mapped);
        }

        // --- Jabatan Fungsional
        if (jafRes.ok) {
          const j = await jafRes.json();
          const items: any[] = j.data || [];
          const filtered = items.filter(it => it.userId === userId);
          const mapped: JabatanFungsionalRow[] = filtered.map(it => ({
            id: it.id,
            jabatanFungsional: it.jabatanFungsional,
            noSK: it.nomorSK,
            tglSK: new Date(it.tanggalSK).toISOString().split('T')[0],
            tmt: new Date(it.tmt).toISOString().split('T')[0],
            jenis: it.jenis,
            angkaKredit: it.angkaKredit,
            originalName: it.dokumenSK?.originalName,
            dokumenSK: it.dokumenSKId ? `${BASE_URL}/jabatan-fungsional/documents/${it.id}` : undefined,
          }));
          setDataJabatanFungsional(mapped);
        }

        // --- Inpasing
        if (inpRes.ok) {
          const j = await inpRes.json();
          const items: any[] = j.data || [];
          const mapped: InpasingRow[] = items
            .filter(it => it.userId === userId)
            .map(it => ({
              id: it.id,
              kepangkatan: it.kepangkatan,
              noSK: it.nomorSK,
              tglSK: (it.tanggalSK || '').split('T')[0],
              tmt: (it.tmt || '').split('T')[0],
              originalName: it.dokumenSK?.originalName,
              dokumenSK: it.dokumenSKId ? `${BASE_URL}/inpasing/dokumen/${it.id}` : undefined,
            }));
          setDataInpasing(mapped);
        }

        // --- Jabatan Struktural
        if (jasRes.ok) {
          const j = await jasRes.json();
          const items: any[] = j.data || [];
          const mapped: JabatanStrukturalRow[] = items
            .filter(it => it.userId === userId)
            .map(it => ({
              id: it.id,
              jabatanStruktural: it.namaJabatan,
              sk: it.nomorSK,
              periodeMenjabat: it.periodeMenjabat,
              skPemberhentian: it.skPemberhentian || '-',
              tmtPemberhentian: it.tmtPemberhentian ? new Date(it.tmtPemberhentian).toISOString().split('T')[0] : '-',
              tunjanganTetap: it.tunjanganTetap,
              tunjanganVariable: it.tunjanganVariabel,
              originalName: it.dokumenSK?.originalName,
              dokumenSK: it.dokumenSKId ? `${BASE_URL}/jabatan-struktural/dokumen/${it.id}` : undefined,
            }));
          setDataJabatanStruktural(mapped);
        }

        // --- Penempatan
        if (penRes.ok) {
          const j = await penRes.json();
          const items: any[] = j.data || [];
          const mapped: PenempatanRow[] = items
            .filter(it => it.userId === userId)
            .map(it => ({
              id: it.id,
              unitKerja: it.unitKerja,
              noSK: it.nomorSK ?? it.NomorSK,
              tglSK: (it.tanggalSK || '').split('T')[0],
              tmt: (it.tmt || '').split('T')[0],
              originalName: it.dokumenSK?.originalName,
              dokumenSK: it.dokumenSKId ? `${BASE_URL}/penempatan/dokumen/${it.id}` : undefined,
            }));
          setDataPenempatan(mapped);
        }

        // --- Kendaraan
        if (kenRes.ok) {
          const j = await kenRes.json();
          const items: any[] = j.data || [];
          const mapped: KendaraanRow[] = items
            .filter(it => it.userId === userId)
            .map(it => ({
              id: it.id,
              namaPemilik: it.namaPemilik,
              noKendaraan: it.nomorKendaraan ?? it.noKendaraan,
              merek: it.merek,
              jenis: it.jenis,
              dokumen: it.dokumen?.path
                ? toPublicUrl(it.dokumen.path)                         // jika back-end kirim path
                : (it.dokumenId || it.dokumen?.id)
                  ? `${BASE_URL}/kendaraan/dokumen/${it.id}`          // jika ada endpoint download
                  : undefined,
              originalName: it.dokumen?.originalName,
            }));
          setDataKendaraan(mapped);
        }
      } catch (e) {
        // cukup log; DashboardInfo tetap tampil dengan data yang berhasil diisi
        console.error('Gagal memuat sebagian data dashboard:', e);
      }
    })();
  }, [userId]);

  return (
    <ContentLayout title="Dashboard">
      <DashboardBreadcrumb />
      <div className="mt-6 w-full space-y-6">
        {loading ? (
          <p className="text-gray-500">Memuat data pegawai...</p>
        ) : pegawai ? (
          <>
            <DashboardProfileCard pegawai={pegawai} />
            <DashboardInfo
              role={userRole || ''}
              dataKepangkatan={dataKepangkatan}
              dataAnggotaKeluarga={dataAnggotaKeluarga}
              dataRiwayatPendidikan={dataRiwayatPendidikan}
              dataJabatanFungsional={dataJabatanFungsional}
              dataInpasing={dataInpasing}
              dataJabatanStruktural={dataJabatanStruktural}
              dataPenempatan={dataPenempatan}
              dataKendaraan={dataKendaraan}
            />
          </>
        ) : (
          <p className="text-red-500">Data pegawai tidak ditemukan.</p>
        )}
      </div>
    </ContentLayout>
  );
}
