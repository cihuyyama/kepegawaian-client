'use client';

import { useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';
import { KepangkatanRow } from '@/types';

export function DashboardKepangkatanTable({ data }: { data: KepangkatanRow[] }) {
  // handler untuk download/view dokumen SK via API
  const handleDownload = useCallback(async (docId: string, filename: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/kepangkatan/documents/${docId}`,
        {
          credentials: 'include',
        }
      );
      if (!res.ok) throw new Error('Gagal mengunduh dokumen');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Download gagal');
    }
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Kepangkatan</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">No. SK</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Tgl. SK</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">TMT</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Tgl. Akhir Kontrak</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Jenis SK</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Gaji Pokok</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Dokumen SK</TableHead>
          <TableHead className="border px-4 py-2 bg-gray-100 text-gray-800">Mulai Masa Kerja?</TableHead>
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
              {row.docId ? (
                <button
                  onClick={() =>
                    handleDownload(
                      row.docId!,                                 
                      row.originalName ?? `${row.noSK}.pdf`
                    )
                  }
                  title="Unduh / View Dokumen SK"
                  className="inline-block hover:text-blue-600"
                >
                  <Download className="h-5 w-5 text-blue-500" />
                </button>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className="border px-4 py-2 text-center">
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
