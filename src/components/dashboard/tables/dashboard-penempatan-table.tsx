// src/components/dashboard/tables/dashboard-penempatan-table.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
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
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import { Download, Trash2, Pencil } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';
import type { PenempatanRow } from '@/types';

interface DashboardPenempatanTableProps {
  data: PenempatanRow[];
  role?: string;
  userinfoId?: string;
  userId?: string;
}

export function DashboardPenempatanTable({
  data,
  role = '',
  userinfoId,
  userId,
}: DashboardPenempatanTableProps) {
  const [rows, setRows] = useState<PenempatanRow[]>(data);
  const isAdmin = role === 'admin';

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleDownload = useCallback(async (url: string, filename: string) => {
    try {
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error('Gagal mengunduh dokumen');
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Download gagal');
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/penempatan/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus data');
      }
      setRows(prev => prev.filter(x => x.id !== id));
      toast.success('Penempatan berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus data');
    }
  };

  return (
    <Table className="table-auto w-full">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Unit Kerja</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">No. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tgl. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">TMT</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Dokumen SK</TableHead>
          {isAdmin && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell className="border px-4 py-2">{row.unitKerja}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tmt}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.dokumenSK ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(row.dokumenSK!, `penempatan-${row.noSK}.pdf`)}
                >
                  <Download className="h-5 w-5 text-blue-500" />
                </Button>
              ) : (
                '-'
              )}
            </TableCell>

            {isAdmin && (
              <TableCell className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  {/* Jika nanti ada halaman edit: */}
                  {/* <Link href={`/users/userinfo/${userinfoId}/penempatan/${row.id}/edit?userId=${userId}`}>
                    <Button size="icon" variant="ghost" title="Edit">
                      <Pencil className="w-4 h-4 text-green-600" />
                    </Button>
                  </Link> */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost" title="Hapus">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={e => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Penempatan?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Data ini akan dihapus permanen. Lanjutkan?
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
