'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pegawai } from './types';

export function DashboardProfileCard({ pegawai }: { pegawai: Pegawai }) {
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
            <div>
              <span className="text-gray-500 font-medium">Nama:</span>
              <p>{pegawai.nama}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">NIP:</span>
              <p>{pegawai.nip}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Jabatan:</span>
              <p>{pegawai.jabatan}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Golongan:</span>
              <p>{pegawai.golongan}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Unit Kerja:</span>
              <p>{pegawai.unit}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Status:</span>
              <p>{pegawai.status}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 font-medium">Email:</span>
              <p>{pegawai.email}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
