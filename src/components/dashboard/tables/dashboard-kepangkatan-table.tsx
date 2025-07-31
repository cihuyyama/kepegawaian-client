// src/components/dashboard/tables/dashboard-kepangkatan-table.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Download, Pencil, Trash2 } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';
import type { KepangkatanRow } from '@/types';

interface DashboardKepangkatanTableProps {
  data: KepangkatanRow[];
  role: string;
  userinfoId: string;
  userId: string;
}

export function DashboardKepangkatanTable({
  data,
  role,
  userinfoId,
  userId,
}: DashboardKepangkatanTableProps) {
  const router = useRouter();
  const [rows, setRows] = useState<KepangkatanRow[]>(data);

  // sync prop data → state
  useEffect(() => {
    setRows(data);
  }, [data]);

  // download dokumen handler
  const handleDownload = useCallback(async (docId: string, filename: string) => {
    try {
      const res = await fetch(`${BASE_URL}/kepangkatan/documents/${docId}`, {
        credentials: 'include',
      });
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
      toast.error(err.message || 'Download gagal');
    }
  }, []);

  // hapus kepangkatan
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/kepangkatan/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus data');
      }
      // optimistic update
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast.success('Kepangkatan berhasil dihapus');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Gagal menghapus data');
    }
  };

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
          {role === 'admin' && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="border px-4">{row.kepangkatan}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tmt}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglAkhirKontrak}</TableCell>
            <TableCell className="border px-4">{row.jenisSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.gajiPokok}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.docId ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleDownload(
                      row.docId!,
                      row.originalName ?? `${row.noSK}.pdf`
                    )
                  }
                >
                  <Download className="h-5 w-5 text-blue-500" />
                </Button>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className="border px-4 py-2 text-center">
              <input type="checkbox" disabled checked={!!row.mulaiMasaKerja} />
            </TableCell>
            {role === 'admin' && (
              <TableCell className="border px-4 py-2 text-center">
                <div className="flex justify-center items-center space-x-2">
                  {/* Edit icon */}
                  {/* <Link
                    href={`/users/userinfo/${userinfoId}/kepangkatan/${row.id}/edit?userId=${userId}`}
                  >
                    <Button size="icon" variant="ghost">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link> */}

                  {/* Delete icon with confirmation dialog */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kepangkatan?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Data kepangkatan ini akan dihapus permanen. Lanjutkan?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDelete(row.id)}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
