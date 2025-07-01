'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { KepangkatanRow } from '../types';
import { Download } from 'lucide-react';

export function DashboardKepangkatanTable({ data }: { data: KepangkatanRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Kepangkatan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">No. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tgl. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">TMT</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tgl. Akhir Kontrak</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Jenis SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Gaji Pokok</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Dokumen SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Mulai Masa Kerja?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.noSK}>
            <TableCell className="border px-4">{row.kepangkatan}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tmt}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglAkhirKontrak}</TableCell>
            <TableCell className="border px-4">{row.jenisSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.gajiPokok}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.dokumenSK ? (
                <a
                  href={row.dokumenSK}
                  download
                  title="Unduh Dokumen SK"
                  className="inline-block hover:text-blue-600"
                >
                  <Download className="h-5 w-5 text-blue-500" />
                </a>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className="whitespace-nowrap border px-4 py-2 text-center">
              <input
                type="checkbox"
                disabled
                checked={!!row.mulaiMasaKerja}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
