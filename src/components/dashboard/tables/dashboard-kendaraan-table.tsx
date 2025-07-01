// DashboardKendaraanTable.tsx
'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import type { KendaraanRow } from '../types';

export function DashboardKendaraanTable({ data }: { data: KendaraanRow[] }) {
  return (
    <Table className="table-auto border-collapse w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Nama Pemilik
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            No. Kendaraan
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Merek
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Jenis
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Dokumen
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx} className="hover:bg-gray-50">
            <TableCell className="border px-4 py-2">{row.namaPemilik}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noKendaraan}</TableCell>
            <TableCell className="border px-4 py-2">{row.merek}</TableCell>
            <TableCell className="border px-4 py-2">{row.jenis}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.dokumen ? (
                <a
                  href={row.dokumen}
                  download
                  title="Unduh Dokumen"
                  className="inline-block hover:text-blue-600"
                >
                  <Download className="h-5 w-5 text-blue-500" />
                </a>
              ) : (
                '-'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
