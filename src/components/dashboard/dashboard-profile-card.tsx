'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import type { Pegawai } from './types';

export function DashboardProfileCard({ pegawai }: { pegawai: Pegawai }) {
  const info: { label: string; value?: string }[] = [
    { label: 'NIP', value: pegawai.nip },
    { label: 'Nama', value: `${pegawai.gelarDepan ?? ''} ${pegawai.nama} ${pegawai.gelarBelakang ?? ''}`.trim() },
    { label: 'Jenis Kelamin', value: pegawai.jenisKelamin },
    { label: 'Agama', value: pegawai.agama },
    { label: 'Golongan Darah', value: pegawai.golonganDarah },
    { label: 'Tempat, Tgl. Lahir', value: `${pegawai.tempatLahir}, ${pegawai.tanggalLahir}` },
    { label: 'Alamat', value: pegawai.alamat },
    { label: 'No. Handphone', value: pegawai.noHandphone },
    { label: 'NBM', value: pegawai.nbm },
    { label: 'NIDN', value: pegawai.nidn },
    { label: 'NIDK', value: pegawai.nidk },
    { label: 'NUPTK', value: pegawai.nuptk },
    { label: 'ID Scholar', value: pegawai.idScholar },
    { label: 'ID Scopus', value: pegawai.idScopus },
    { label: 'IS Shinta', value: pegawai.isShinta },
    { label: 'ID Garuda', value: pegawai.idGaruda },
    { label: 'NPWP', value: pegawai.npwp },
    { label: 'Email Pribadi', value: pegawai.emailPribadi },
    { label: 'Email Universitas', value: pegawai.emailUniversitas },
    { label: 'NIK Kependudukan', value: pegawai.nikKependudukan },
    { label: 'Jabatan Struktural', value: pegawai.jabatanStruktural },
    { label: 'Jabatan Fungsional', value: pegawai.jabatanFungsional },
    { label: 'Dok. KTP', value: pegawai.dokKtp },
    { label: 'Dok. NBM', value: pegawai.dokNbm },
    { label: 'Dok. Passport', value: pegawai.dokPassport },
    { label: 'Dok. BPJS Kesehatan', value: pegawai.dokBpjsKesehatan },
    { label: 'Dok. BPJS Tenagakerja', value: pegawai.dokBpjsTenagakerja },
    { label: 'Dok. Sertifikasi Dosen', value: pegawai.dokSertifikasiDosen },
    { label: 'Dok. NIDN', value: pegawai.dokNidn },
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
            <div className="w-40 h-40 rounded-md overflow-hidden border">
              <Image
                src={pegawai.foto}
                alt={pegawai.nama}
                width={160}
                height={160}
                className="object-cover w-full h-full"
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
