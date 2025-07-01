// DashboardPenempatanTable.tsx
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
import type { PenempatanRow } from '../types';

export function DashboardPenempatanTable({ data }: { data: PenempatanRow[] }) {
  return (
    <Table className="table-auto border-collapse w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Unit Kerja
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            No. SK
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Tgl. SK
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            TMT
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Dokumen SK
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx} className="hover:bg-gray-50">
            <TableCell className="border px-4 py-2">{row.unitKerja}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tmt}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
