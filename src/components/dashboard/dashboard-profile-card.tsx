'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import type { Pegawai } from './types';

export function DashboardProfileCard({ pegawai }: { pegawai: Pegawai }) {
  const sanitizeValue = (val: string | undefined | null) =>
    val && val.trim() !== '' ? val : '-';

  const info: { label: string; value?: string }[] = [
    { label: 'NIP', value: sanitizeValue(pegawai.nip) },
    {
      label: 'Nama',
      value: sanitizeValue(
        `${pegawai.gelarDepan ?? ''} ${pegawai.nama ?? ''} ${pegawai.gelarBelakang ?? ''}`.trim()
      )
    },
    { label: 'Jenis Kelamin', value: sanitizeValue(pegawai.jenisKelamin) },
    { label: 'Agama', value: sanitizeValue(pegawai.agama) },
    { label: 'Golongan Darah', value: sanitizeValue(pegawai.golonganDarah) },
    {
      label: 'Tempat, Tgl. Lahir',
      value: (() => {
        const tempat = sanitizeValue(pegawai.tempatLahir);
        const tanggal = sanitizeValue(pegawai.tanggalLahir);
        if (tempat === '-' && tanggal === '-') return '-';
        if (tempat === '-') return tanggal;
        if (tanggal === '-') return tempat;
        return `${tempat}, ${tanggal}`;
      })()
    },
    { label: 'Alamat', value: sanitizeValue(pegawai.alamat) },
    { label: 'No. Handphone', value: sanitizeValue(pegawai.noHandphone) },
    { label: 'NBM', value: sanitizeValue(pegawai.nbm) },
    { label: 'NIDN', value: sanitizeValue(pegawai.nidn) },
    { label: 'NIDK', value: sanitizeValue(pegawai.nidk) },
    { label: 'NUPTK', value: sanitizeValue(pegawai.nuptk) },
    { label: 'ID Scholar', value: sanitizeValue(pegawai.idScholar) },
    { label: 'ID Scopus', value: sanitizeValue(pegawai.idScopus) },
    { label: 'ID Shinta', value: sanitizeValue(pegawai.idShinta) },
    { label: 'ID Garuda', value: sanitizeValue(pegawai.idGaruda) },
    { label: 'NPWP', value: sanitizeValue(pegawai.npwp) },
    { label: 'Email Pribadi', value: sanitizeValue(pegawai.emailPribadi) },
    { label: 'Email Universitas', value: sanitizeValue(pegawai.emailUniversitas) },
    { label: 'NIK Kependudukan', value: sanitizeValue(pegawai.nikKependudukan) },
    { label: 'Jabatan Struktural', value: sanitizeValue(pegawai.jabatanStruktural) },
    { label: 'Jabatan Fungsional', value: sanitizeValue(pegawai.jabatanFungsional) },
    { label: 'Dok. KTP', value: sanitizeValue(pegawai.dokKtp) },
    { label: 'Dok. NBM', value: sanitizeValue(pegawai.dokNbm) },
    { label: 'Dok. Passport', value: sanitizeValue(pegawai.dokPassport) },
    { label: 'Dok. BPJS Kesehatan', value: sanitizeValue(pegawai.dokBpjsKesehatan) },
    { label: 'Dok. BPJS Tenagakerja', value: sanitizeValue(pegawai.dokBpjsTenagakerja) },
    { label: 'Dok. Sertifikasi Dosen', value: sanitizeValue(pegawai.dokSertifikasiDosen) },
    { label: 'Dok. NIDN', value: sanitizeValue(pegawai.dokNidn) },
  ];

  const fileNameFromUrl = (url: string) => {
    try {
      return decodeURIComponent(url.split('/').pop() || '');
    } catch {
      return url;
    }
  };

  const half = Math.ceil(info.length / 2);
  const leftItems = info.slice(0, half);
  const rightItems = info.slice(half);

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
                    ? `${process.env.NEXT_PUBLIC_DOMAIN}/${pegawai.imgUrl}`
                    : '/img/Default-Icon.jpg'
                }
                alt="Foto Pegawai"
                className="object-cover w-full h-full rounded-md border"
              />
            </div>
          </div>

          {/* Info Pegawai */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Kolom kiri */}
            <div className="space-y-4">
              {leftItems.map(({ label, value }) => (
                <div key={label}>
                  <span className="text-gray-500 font-medium">{label}:</span>
                  {label.startsWith('Dok.') ? (
                    <p className="flex items-center space-x-1">
                      <Upload className="w-4 h-4 text-gray-600" />
                      {value ? (
                        <a
                          href={value}
                          download
                          className="underline text-blue-600 hover:text-blue-800"
                        >
                          {fileNameFromUrl(value)}
                        </a>
                      ) : (
                        <span className="text-gray-400">Belum ada dokumen</span>
                      )}
                    </p>
                  ) : (
                    <p>{value ?? '-'}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Kolom kanan */}
            <div className="space-y-4">
              {rightItems.map(({ label, value }) => (
                <div key={label}>
                  <span className="text-gray-500 font-medium">{label}:</span>
                  {label.startsWith('Dok.') ? (
                    <p className="flex items-center space-x-1">
                      <Upload className="w-4 h-4 text-gray-600" />
                      {value ? (
                        <a
                          href={value}
                          download
                          className="underline text-blue-600 hover:text-blue-800"
                        >
                          {fileNameFromUrl(value)}
                        </a>
                      ) : (
                        <span className="text-gray-400">Belum ada dokumen</span>
                      )}
                    </p>
                  ) : (
                    <p>{value ?? '-'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
