// src/components/dosen/dosen-detail.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
import { BASE_URL } from '@/constant/BaseURL';

export function DosenDetail({
  userId,
  pegawai,
  keluarga,
  pendidikan,
  jafung,
  inpasing,
  jastru,
  penempatan,
  kendaraan,
  role = 'kaprodi',
}: {
  /** wajib: id user untuk filter kepangkatan */
  userId: string;
  pegawai: Pegawai;
  keluarga: AnggotaKeluargaRow[];
  pendidikan: RiwayatPendidikanRow[];
  jafung: JabatanFungsionalRow[];
  inpasing: InpasingRow[];
  jastru: JabatanStrukturalRow[];
  penempatan: PenempatanRow[];
  kendaraan: KendaraanRow[];
  role?: string;
}) {
  const [kepangkatanData, setKepangkatanData] = useState<KepangkatanRow[]>([]);
  const [keluargaData, setKeluargaData] = useState<AnggotaKeluargaRow[]>([]);
  const [pendidikanData, setPendidikanData] = useState<RiwayatPendidikanRow[]>([]);
  const [jafungData, setJafungData] = useState<JabatanFungsionalRow[]>([]);
  const [inpasingData, setInpasingData] = useState<InpasingRow[]>([]);
  const [jastruData, setJastruData] = useState<JabatanStrukturalRow[]>([]);
  const [penempatanData, setPenempatanData] = useState<PenempatanRow[]>(penempatan || []);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      try {
        // ambil semua kepangkatan
        const res = await fetch(`${BASE_URL}/kepangkatan`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat kepangkatan');
        const json = await res.json();
        const items: any[] = json.data || [];

        const fmtDate = (iso: string) => {
          const d = new Date(iso);
          return [
            String(d.getDate()).padStart(2, '0'),
            String(d.getMonth() + 1).padStart(2, '0'),
            d.getFullYear(),
          ].join('-');
        };

        // filter hanya yang userId-nya sama
        const filtered = items.filter(it => it.userId === userId);

        // map ke KepangkatanRow
        const mapped: KepangkatanRow[] = filtered.map(it => ({
          id: it.id,
          kepangkatan: it.nama,
          noSK: it.NomorSK,
          tglSK: fmtDate(it.TanggalSK),
          tmt: fmtDate(it.TMT),
          tglAkhirKontrak: it.TanggalAkhirKontrak
            ? fmtDate(it.TanggalAkhirKontrak)
            : '-',
          jenisSK: it.JenisSK,
          gajiPokok: it.GajiPokok,
          docId: it.id, // untuk endpoint download nanti
          originalName: it.DokumenSK?.originalName,
          dokumenSK: it.DokumenSK?.path
            ? `${process.env.NEXT_PUBLIC_DOMAIN}/${it.DokumenSK.path
              .split('public\\')[1]
              ?.replace(/\\/g, '/')}`
            : undefined,
          mulaiMasaKerja: false,
        }));

        setKepangkatanData(mapped);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat data kepangkatan');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // fetch anggota keluarga
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/keluargauser/${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat anggota keluarga');
        const json = await res.json();
        const items: any[] = json.data || [];
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
        setKeluargaData(mapped);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat anggota keluarga');
      }
    })();
  }, [userId]);

  // fetch riwayat pendidikan
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/pendidikan/user/${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat riwayat pendidikan');
        const json = await res.json();
        const items: any[] = json.data || [];
        const mapped: RiwayatPendidikanRow[] = items.map(it => ({
          id: it.id,
          userId: it.userId,
          pendidikan: it.pendidikan,
          namaInstitusi: it.namaInstitusi,
          tahunLulus: String(it.tahunLulus),
          dokumen: [], // jika endpoint dokumen belum ada
        }));
        setPendidikanData(mapped);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat riwayat pendidikan');
      }
    })();
  }, [userId]);


  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/jabatan-fungsional`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat jabfung');
        const json = await res.json();
        const items: any[] = json.data || [];

        const mapped = items
          .filter(it => it.userId === userId)
          .map(it => ({
            id: it.id,
            jabatanFungsional: it.jabatanFungsional,
            noSK: it.nomorSK,
            tglSK: new Date(it.tanggalSK).toISOString().split('T')[0],
            tmt: new Date(it.tmt).toISOString().split('T')[0],
            jenis: it.jenis,
            angkaKredit: it.angkaKredit,
            originalName: it.dokumenSK?.originalName,
            dokumenSK: it.dokumenSKId
              ? `${BASE_URL}/jabatan-fungsional/documents/${it.id}`
              : undefined,
          }));
        setJafungData(mapped);
      } catch (e) {
        console.error(e);
        toast.error('Gagal memuat jabatan fungsional');
      }
    })();
  }, [userId]);


  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/inpasing/user/${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat inpasing');
        const json = await res.json();
        const items: any[] = json.data || [];
        const mapped: InpasingRow[] = items
          .filter(it => it.userId === userId)
          .map(it => ({
            id: it.id,
            kepangkatan: it.kepangkatan,
            noSK: it.nomorSK,
            tglSK: it.tanggalSK.split('T')[0],       // 'YYYY-MM-DD'
            tmt: it.tmt.split('T')[0],
            originalName: it.dokumenSK?.originalName,
            dokumenSK: it.dokumenSKId
              ? `${BASE_URL}/inpasing/dokumen/${it.id}`
              : undefined,
          }));
        setInpasingData(mapped);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat inpasing');
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/jabatan-struktural/user/${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat jabatan struktural');
        const json = await res.json();
        const items: any[] = json.data || [];

        const mapped: JabatanStrukturalRow[] = items
          .filter(it => it.userId === userId)
          .map(it => ({
            id: it.id,
            jabatanStruktural: it.namaJabatan,
            sk: it.nomorSK,
            periodeMenjabat: it.periodeMenjabat,
            skPemberhentian: it.skPemberhentian || '-',
            tmtPemberhentian: it.tmtPemberhentian
              ? new Date(it.tmtPemberhentian).toISOString().split('T')[0]
              : '-',
            tunjanganTetap: it.tunjanganTetap,
            tunjanganVariable: it.tunjanganVariabel,
            originalName: it.dokumenSK?.originalName,
            dokumenSK: it.dokumenSKId
              ? `${BASE_URL}/jabatan-struktural/dokumen/${it.id}`
              : undefined,
          }));
        setJastruData(mapped);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat jabatan struktural');
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        // asumsi endpoint
        const res = await fetch(`${BASE_URL}/penempatan/user/${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat penempatan');
        const json = await res.json();
        const items: any[] = json.data || [];

        const mapped: PenempatanRow[] = items
          .filter(it => it.userId === userId) // aman meski endpoint sudah filter
          .map(it => ({
            id: it.id,
            unitKerja: it.unitKerja,
            noSK: it.nomorSK ?? it.NomorSK,
            tglSK: it.tanggalSK.split('T')[0],
            tmt: it.tmt.split('T')[0],
            // jika API kembalikan path file langsung:
            originalName: it.dokumenSK?.originalName,
            dokumenSK: it.dokumenSKId
              ? `${BASE_URL}/penempatan/dokumen/${it.id}`
              : undefined,
          }));

        setPenempatanData(mapped);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat penempatan');
      }
    })();
  }, [userId]);



  if (loading) {
    return (
      <p className="mt-6 text-center text-gray-500">
        Memuat data kepangkatan…
      </p>
    );
  }

  return (
    <>
      <DosenProfileCard pegawai={pegawai} />

      <DashboardInfo
        role={role}
        dataKepangkatan={kepangkatanData}
        dataAnggotaKeluarga={keluargaData}
        dataRiwayatPendidikan={pendidikanData}
        dataJabatanFungsional={jafungData}
        dataInpasing={inpasingData}
        dataJabatanStruktural={jastruData}
        dataPenempatan={penempatanData}
        dataKendaraan={kendaraan}
      />
    </>
  );
}
