'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Upload, Pencil, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Pegawai,
  AnggotaKeluargaRow,
  InpasingRow,
  JabatanFungsionalRow,
  JabatanStrukturalRow,
  KendaraanRow,
  PenempatanRow,
  RiwayatPendidikanRow,
  KepangkatanRow,
} from '@/types';

import { BASE_URL } from '@/constant/BaseURL';
import { buildDoc, DocumentType, UserDocument } from '@/utils/documents';
import { DashboardInfo } from '@/components/dashboard/dashboard-info';

/* =======================================================================
   PAGE
   ======================================================================= */
export default function EditUserinfoPage() {
  const { userinfoId } = useParams<{ userinfoId: string }>();

  const [role, setRole] = useState<string>('');
  const [rawData, setRawData] = useState<any>(null);      // object asli userinfo
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);

  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [imageVersion, setImageVersion] = useState(Date.now());

  const [dataKepangkatan, setDataKepangkatan] = useState<KepangkatanRow[]>([]);
  const [dataAnggotaKeluarga, setDataAnggotaKeluarga] = useState<AnggotaKeluargaRow[]>([]);

  // --- load data ---


  // --- handlers ---
  const onFieldSave = async (field: string, value: string) => {
    if (!rawData?.userId) return;

    const payload = { userId: rawData.userId, [field]: value };

    const res = await fetch(`${BASE_URL}/userinfo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast.error(j?.message || 'Gagal menyimpan');
      throw new Error(j?.message || 'Gagal menyimpan');
    }

    // update state lokal
    setRawData((p: any) => ({ ...p, [field]: value }));
    setPegawai((p) => (p ? { ...p, ...mapFieldToPegawai(field, value) } : p));
    toast.success('Perubahan disimpan');
  };

  const onPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !rawData?.userId) return;
    setPhotoLoading(true);
    try {
      const form = new FormData();
      form.append('image', e.target.files[0]);

      const res = await fetch(`${BASE_URL}/users/${rawData.userId}/photo`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
      });

      if (!res.ok) throw new Error('Gagal mengunggah foto');

      toast.success('Foto berhasil diperbarui');
      setImageVersion(Date.now());
    } catch (err: any) {
      toast.error(err.message || 'Upload gagal');
    } finally {
      setPhotoLoading(false);
    }
  };

  const onDocUpdated = async (type: DocumentType) => {
    // setelah upload, ambil ulang /userinfo untuk sync rawData & pegawai
    try {
      const r = await fetch(`${BASE_URL}/userinfo`, { credentials: 'include' });
      const j = await r.json();
      const arr = j.data || [];
      const fresh = arr.find((x: any) => x.id === userinfoId);
      if (!fresh) return;

      setRawData(fresh);
      const newDoc = buildDoc(fresh.userId, type, fresh[typeMapRawKey(type)]);
      setPegawai((prev) =>
        prev ? { ...prev, ...mapDocToPegawai(type, newDoc) } : prev
      );
    } catch (e) {
      // fallback: biarkan saja
    }
  };



  // Dummy data untuk DashboardInfo
  const dataRiwayatPendidikan: RiwayatPendidikanRow[] = [];
  const dataJabatanFungsional: JabatanFungsionalRow[] = [];
  const dataInpasing: InpasingRow[] = [];
  const dataJabatanStruktural: JabatanStrukturalRow[] = [];
  const dataPenempatan: PenempatanRow[] = [];
  const dataKendaraan: KendaraanRow[] = [];

  // 1) Fetch role & userinfo
  useEffect(() => {
    (async () => {
      try {
        const [roleRes, infoRes] = await Promise.all([
          fetch(`${BASE_URL}/users/access-token`, { credentials: 'include' }),
          fetch(`${BASE_URL}/userinfo`, { credentials: 'include' }),
        ]);

        const roleJson = await roleRes.json();
        setRole(roleJson.data?.role ?? '');

        const infoJson = await infoRes.json();
        const found = (infoJson.data || []).find((u: any) => u.id === userinfoId);
        if (!found) throw new Error('Userinfo tidak ditemukan');

        setRawData(found);
        setPegawai(mapToPegawai(found));
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, [userinfoId]);

  // 2) Setelah rawData.userId tersedia, fetch kepangkatan hanya sekali
  useEffect(() => {
    if (!rawData?.userId) return;
    (async () => {
      try {
        // ambil semua kepangkatan
        const res = await fetch(
          `${BASE_URL}/kepangkatan`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Gagal memuat kepangkatan');
        const json = await res.json();
        const items: any[] = json.data || [];

        // helper format tanggal
        const fmt = (iso: string) => {
          const d = new Date(iso);
          return [
            String(d.getDate()).padStart(2, '0'),
            String(d.getMonth() + 1).padStart(2, '0'),
            d.getFullYear(),
          ].join('-');
        };

        // filter hanya yang userId-nya match
        const filtered = items.filter(it => it.userId === rawData.userId);

        // map ke interface KepangkatanRow
        const mapped: KepangkatanRow[] = filtered.map(it => ({
          id: it.id,
          kepangkatan: it.nama,
          noSK: it.NomorSK,
          tglSK: fmt(it.TanggalSK),
          tmt: fmt(it.TMT),
          tglAkhirKontrak: it.TanggalAkhirKontrak
            ? fmt(it.TanggalAkhirKontrak)
            : '-',
          jenisSK: it.JenisSK,
          gajiPokok: it.GajiPokok,
          docId: it.id,  // pakai record.id untuk download endpoint
          originalName: it.DokumenSK?.originalName,
          dokumenSK: it.DokumenSK?.path
            ? `${process.env.NEXT_PUBLIC_DOMAIN}/${it.DokumenSK.path
              .split('public\\')[1]
              ?.replace(/\\/g, '/')}`
            : undefined,
          mulaiMasaKerja: false,
        }));

        setDataKepangkatan(mapped);
      } catch (e: any) {
        console.error(e);
        toast.error(e.message || 'Gagal memuat data kepangkatan');
      }
    })();
  }, [rawData?.userId]);


  // 3) Setelah rawData.userId tersedia, fetch anggota keluarga
  useEffect(() => {
    if (!rawData?.userId) return;
    (async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/keluargauser/${rawData.userId}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Gagal memuat data anggota keluarga');
        const json = await res.json();
        const items: any[] = json.data || [];

        // Map API response ke AnggotaKeluargaRow
        const mapped: AnggotaKeluargaRow[] = items.map((it) => ({
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
      } catch (e: any) {
        console.error(e);
        toast.error(e.message || 'Gagal memuat anggota keluarga');
      }
    })();
  }, [rawData?.userId]);

  if (loading) return <p className="mt-6 text-center text-gray-500">Memuat...</p>;
  if (!rawData || !pegawai)
    return <p className="mt-6 text-center text-red-500">Data tidak ditemukan.</p>;
  return (
    <ContentLayout title="Edit Profil Pegawai">
      <UserBreadcrumb page="Data" />

      <div className="mt-6 space-y-6">
        <EditableProfileCard
          pegawai={pegawai}
          rawData={rawData}
          userId={rawData.userId}
          photoLoading={photoLoading}
          imageVersion={imageVersion}
          onPhotoUpload={onPhotoUpload}
          onFieldSave={onFieldSave}
          onDocUpdated={onDocUpdated}
        />

        <DashboardInfo
          role={role}
          userId={rawData.userId}
          userinfoId={userinfoId}
          dataKepangkatan={dataKepangkatan}
          dataAnggotaKeluarga={dataAnggotaKeluarga}
          dataRiwayatPendidikan={dataRiwayatPendidikan}
          dataJabatanFungsional={dataJabatanFungsional}
          dataInpasing={dataInpasing}
          dataJabatanStruktural={dataJabatanStruktural}
          dataPenempatan={dataPenempatan}
          dataKendaraan={dataKendaraan}
        />
      </div>
    </ContentLayout>
  );
}

/* =======================================================================
   COMPONENT: EditableProfileCard (ala dosen-profile, tapi editable)
   ======================================================================= */
type InfoItem =
  | { label: string; field: string; type?: 'date' | 'select-gender' }
  | { label: string; value: unknown }
  | { label: string; docType: DocumentType; value: UserDocument | null };

function EditableProfileCard({
  pegawai,
  rawData,
  userId,
  onFieldSave,
  photoLoading,
  imageVersion,
  onPhotoUpload,
  onDocUpdated,
}: {
  pegawai: Pegawai;
  rawData: any;
  userId: string;
  onFieldSave: (field: string, value: string) => Promise<void>;
  photoLoading: boolean;
  imageVersion: number;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDocUpdated: (type: DocumentType) => Promise<void>;
}) {
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  const [editingDoc, setEditingDoc] = useState<DocumentType | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const info: InfoItem[] = [
    { label: 'NIP', field: 'NIP' },
    {
      label: 'Nama',
      value: `${pegawai.gelarDepan ?? ''} ${pegawai.nama ?? ''} ${pegawai.gelarBelakang ?? ''}`.trim(),
    },
    { label: 'Gelar Depan', field: 'GelarDepan' },
    { label: 'Gelar Belakang', field: 'GelarBelakang' },
    { label: 'Jenis Kelamin', field: 'JenisKelamin', type: 'select-gender' },
    { label: 'Agama', value: pegawai.agama ?? '-' },
    { label: 'Golongan Darah', value: pegawai.golonganDarah ?? '-' },
    { label: 'Tempat Lahir', field: 'TempatLahir' },
    { label: 'Tanggal Lahir', field: 'TanggalLahir', type: 'date' },
    { label: 'Alamat', field: 'Alamat' },
    { label: 'No. Handphone', field: 'Phone' },
    { label: 'NBM', field: 'NBM' },
    { label: 'NIDN', field: 'NIDN' },
    { label: 'NIDK', field: 'NIDK' },
    { label: 'NUPTK', field: 'NUPTK' },
    { label: 'ID Scholar', field: 'IDScholar' },
    { label: 'ID Scopus', field: 'IDScopus' },
    { label: 'ID Shinta', field: 'IDShinta' },
    { label: 'ID Garuda', field: 'IDGaruda' },
    { label: 'NPWP', field: 'NPWP' },
    { label: 'Email Pribadi', field: 'WorkEmail' },
    { label: 'Email Universitas', value: pegawai.emailUniversitas ?? '-' },
    { label: 'NIK Kependudukan', field: 'NIK' },
    { label: 'Jabatan Struktural', field: 'JabatanStruktural' },
    { label: 'Jabatan Fungsional', field: 'JabatanFungsional' },

    { label: 'Dok. KTP', docType: 'KTP', value: pegawai.dokKtp ?? null },
    { label: 'Dok. NBM', docType: 'DocNBM', value: pegawai.dokNbm ?? null },
    { label: 'Dok. Passport', docType: 'Passport', value: pegawai.dokPassport ?? null },
    { label: 'Dok. BPJS Kesehatan', docType: 'BPJSKesehatan', value: pegawai.dokBpjsKesehatan ?? null },
    { label: 'Dok. BPJS Tenagakerja', docType: 'BPJSKetenagakerjaan', value: pegawai.dokBpjsTenagakerja ?? null },
    { label: 'Dok. Sertifikasi Dosen', docType: 'SertifikasiDosen', value: pegawai.dokSertifikasiDosen ?? null },
    { label: 'Dok. NIDN', docType: 'DocNIDN', value: pegawai.dokNidn ?? null },
  ];

  const half = Math.ceil(info.length / 2);
  const leftItems = info.slice(0, half);
  const rightItems = info.slice(half);

  const toDisplayDate = (iso?: string) => (iso ? new Date(iso).toISOString().split('T')[0] : '');
  const toDDMMYYYY = (iso?: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };
  const toISODate = (val: string) => new Date(val).toISOString();

  const startEdit = (field: string, type?: 'date' | 'select-gender') => {
    setEditField(field);
    setTempValue(type === 'date' ? toDisplayDate(rawData[field]) : (rawData[field] ?? ''));
  };

  const commitEdit = async () => {
    if (!editField) return;
    const itm = info.find((i) => 'field' in i && i.field === editField) as Extract<
      InfoItem,
      { field: string }
    > | undefined;

    const value = itm?.type === 'date' ? toISODate(tempValue) : tempValue;
    await onFieldSave(editField, value);
    setEditField(null);
  };

  const handleDocUpload = async () => {
    if (!editingDoc || !docFile) return;
    setUploadingDoc(true);
    try {
      const form = new FormData();
      form.append('file', docFile);
      form.append('documentsType', editingDoc);

      const res = await fetch(`${BASE_URL}/userinfo/documents/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
      });

      if (!res.ok) {
        let msg = 'Gagal upload';
        try {
          const j = await res.json();
          msg = j?.message || msg;
        } catch {
          msg = await res.text();
        }
        throw new Error(msg);
      }

      toast.success('Dokumen diunggah');
      setEditingDoc(null);
      setDocFile(null);

      await onDocUpdated(editingDoc);
    } catch (e: any) {
      toast.error(e.message || 'Upload gagal');
    } finally {
      setUploadingDoc(false);
    }
  };

  const renderDocRow = (label: string, docType: DocumentType, doc: UserDocument | null) => {
    const isEditing = editingDoc === docType;
    const finalDoc = doc ?? buildDoc(userId, docType, rawData?.[typeMapRawKey(docType)]);

    return (
      <div key={docType}>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">{label}:</span>
          {!isEditing && (
            <Pencil
              className="w-4 h-4 text-blue-500 cursor-pointer"
              onClick={() => {
                setEditingDoc(docType);
                setDocFile(null);
              }}
            />
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center mt-1">
            <Input type="file" onChange={(e) => setDocFile(e.target.files?.[0] || null)} />
            <div className="flex gap-2">
              <Button variant="default" disabled={!docFile || uploadingDoc} onClick={handleDocUpload}>
                {uploadingDoc && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                Upload
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setEditingDoc(null);
                  setDocFile(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <p className="flex items-center space-x-1">
            <Upload
              className="w-4 h-4 text-blue-500 cursor-pointer"
              onClick={() => setEditingDoc(docType)}
            />
            {finalDoc ? (
              <a
                href={finalDoc.url}
                className="underline text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {fileNameFromDoc(finalDoc)}
              </a>
            ) : (
              <span className="text-gray-400">Belum ada dokumen</span>
            )}
          </p>
        )}
      </div>
    );
  };


  const renderRow = (item: InfoItem) => {
    if ('docType' in item) return renderDocRow(item.label, item.docType, item.value);

    if ('value' in item) {
      return (
        <div key={item.label}>
          <span className="text-gray-500 font-medium">{item.label}:</span>
          <p>{stringifyValue(item.value)}</p>
        </div>
      );
    }

    // editable field
    const { field, type } = item;
    const isEditing = editField === field;
    const currentValue = rawData[field];

    return (
      <div key={field}>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">{item.label}:</span>
          {editField !== field && (
            <Pencil
              className="w-4 h-4 text-blue-500 cursor-pointer"
              onClick={() => startEdit(field, type)}
            />
          )}
        </div>

        {isEditing ? (
          type === 'date' ? (
            <input
              type="date"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={commitEdit}
              className="border rounded px-2 py-1 w-full text-sm"
              autoFocus
            />
          ) : type === 'select-gender' ? (
            <select
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={commitEdit}
              className="border rounded px-2 py-1 w-full text-sm"
              autoFocus
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-Laki</option>
              <option value="P">Perempuan</option>
            </select>
          ) : (
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={commitEdit}
              autoFocus
            />
          )
        ) : (
          <p>
            {type === 'date'
              ? toDDMMYYYY(currentValue as string)
              : type === 'select-gender'
                ? currentValue === 'L'
                  ? 'Laki-Laki'
                  : currentValue === 'P'
                    ? 'Perempuan'
                    : currentValue || '-'
                : (currentValue ?? '-') || '-'}
          </p>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil Pegawai</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Foto */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-[150px] h-[200px] rounded-md overflow-hidden border relative group">
              <img
                src={
                  pegawai?.imgUrl
                    ? pegawai.imgUrl.startsWith('http')
                      ? `${pegawai.imgUrl}?v=${imageVersion}`
                      : `${process.env.NEXT_PUBLIC_DOMAIN}/${pegawai.imgUrl}?v=${imageVersion}`
                    : '/img/Default-Icon.jpg'
                }
                alt="Foto Pegawai"
                className="object-cover w-full h-full rounded-md border"
              />
              <label className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                {photoLoading ? (
                  'Mengunggah...'
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-1" />
                    Ganti Foto
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onPhotoUpload}
                    />
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Info */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-4">{leftItems.map(renderRow)}</div>
            <div className="space-y-4">{rightItems.map(renderRow)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* =======================================================================
   HELPERS
   ======================================================================= */

const stringifyValue = (val: unknown) => {
  if (val === null || val === undefined) return '-';
  if (typeof val === 'object') return ''; // doc handled separately
  if (typeof val === 'string') return val.trim() === '' ? '-' : val.trim();
  return String(val);
};

const fileNameFromDoc = (doc: UserDocument) => doc.originalName || doc.filename;

export const typeMapRawKey = (t: DocumentType) => {
  switch (t) {
    case 'KTP':
      return 'KTP';
    case 'DocNBM':
      return 'DocNBM';
    case 'DocNIDN':
      return 'DocNIDN';
    case 'SertifikasiDosen':
      return 'SertifikasiDosen';
    case 'Passport':
      return 'Passport';
    case 'BPJSKesehatan':
      return 'BPJSKesehatan';
    case 'BPJSKetenagakerjaan':
      return 'BPJSKetenagakerjaan';
  }
};

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

  imgUrl: r.user?.imgUrl || '',
});

export const mapFieldToPegawai = (field: string, value: string): Partial<Pegawai> => {
  switch (field) {
    case 'NIP':
      return { nip: value };
    case 'GelarDepan':
      return { gelarDepan: value };
    case 'GelarBelakang':
      return { gelarBelakang: value };
    case 'JenisKelamin':
      return { jenisKelamin: value };
    case 'TempatLahir':
      return { tempatLahir: value };
    case 'TanggalLahir':
      return { tanggalLahir: value };
    case 'Alamat':
      return { alamat: value };
    case 'Phone':
      return { noHandphone: value };
    case 'NBM':
      return { nbm: value };
    case 'NIDN':
      return { nidn: value };
    case 'NIDK':
      return { nidk: value };
    case 'NUPTK':
      return { nuptk: value };
    case 'IDScholar':
      return { idScholar: value };
    case 'IDScopus':
      return { idScopus: value };
    case 'IDShinta':
      return { idShinta: value };
    case 'IDGaruda':
      return { idGaruda: value };
    case 'NPWP':
      return { npwp: value };
    case 'WorkEmail':
      return { emailPribadi: value };
    case 'NIK':
      return { nikKependudukan: value };
    case 'JabatanStruktural':
      return { jabatanStruktural: value };
    case 'JabatanFungsional':
      return { jabatanFungsional: value };
    default:
      return {};
  }
};

export const mapDocToPegawai = (
  t: DocumentType,
  doc: UserDocument | null
): Partial<Pegawai> => {
  switch (t) {
    case 'KTP':
      return { dokKtp: doc };
    case 'DocNBM':
      return { dokNbm: doc };
    case 'DocNIDN':
      return { dokNidn: doc };
    case 'SertifikasiDosen':
      return { dokSertifikasiDosen: doc };
    case 'Passport':
      return { dokPassport: doc };
    case 'BPJSKesehatan':
      return { dokBpjsKesehatan: doc };
    case 'BPJSKetenagakerjaan':
      return { dokBpjsTenagakerja: doc };
  }
};
