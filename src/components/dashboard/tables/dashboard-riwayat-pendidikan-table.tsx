'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Download, ChevronRight } from 'lucide-react';
import type { RiwayatPendidikanRow } from '../types';
import { cn } from '@/lib/utils';

export function DashboardRiwayatPendidikanTable({
  data,
}: {
  data: RiwayatPendidikanRow[];
}) {
  return (
    <Table className="table-auto border-collapse w-full">
      <TableHeader>
        <TableRow>
          {/* kolom untuk toggle arrow */}
          <TableHead className="border px-4 py-2 bg-gray-100 text-center" />
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Pendidikan
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Nama Institusi
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Tahun Lulus
          </TableHead>

        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, idx) => (
          <RiwayatRow key={idx} row={row} />
        ))}
      </TableBody>
    </Table>
  );
}

// sub‐komponen utk 1 baris + detail collapse
function RiwayatRow({ row }: { row: RiwayatPendidikanRow }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* baris utama */}
      <TableRow className="hover:bg-gray-50">
        <TableCell className="border px-4 py-2 text-center">
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full transition-all duration-200",
              "hover:bg-gray-100 hover:shadow-sm mx-auto", // Added mx-auto to center horizontally
              open && "bg-gray-100"
            )}
            title={open ? "Sembunyikan detail" : "Lihat detail dokumen"}
          >
            <ChevronRight
              className={cn(
                "w-4 h-4 text-gray-600 transition-transform duration-200",
                open && "rotate-90"
              )}
            />
          </button>

        </TableCell>


        <TableCell className="border px-4 py-2">{row.pendidikan}</TableCell>
        <TableCell className="border px-4 py-2">{row.namaInstitusi}</TableCell>
        <TableCell className="border px-4 py-2 text-center">
          {row.tahunLulus}
        </TableCell>

      </TableRow>

      {/* baris kedua, muncul saat open */}
      {open && (
        <TableRow>
          <TableCell colSpan={5} className="p-0 border-0">
            <Table className="w-full table-auto border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="border px-3 py-1 text-center bg-gray-50">
                    Nama Dokumen
                  </TableHead>
                  <TableHead className="border px-3 py-1 text-center bg-gray-50">
                    File Dokumen
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {row.dokumen.map((doc, i) => (
                  <TableRow key={i}>
                    <TableCell className="border px-3 py-1">
                      {doc.namaDokumen}
                    </TableCell>
                    <TableCell className="border px-3 py-1 text-center">
                      <a
                        href={doc.url}
                        download
                        title={doc.namaDokumen}
                        className="inline-block"
                      >
                        <Download className="w-4 h-4 text-blue-500" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
