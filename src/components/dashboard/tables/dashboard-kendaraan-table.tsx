// src/components/dashboard/tables/dashboard-kendaraan-table.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
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
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import { Download, Trash2, Pencil } from 'lucide-react';
import type { KendaraanRow } from '@/types';
import { BASE_URL } from '@/constant/BaseURL';

export function DashboardKendaraanTable({
  data,
  role = '',
  userinfoId,
  userId,
}: {
  data: KendaraanRow[];
  role?: string;
  userinfoId?: string;
  userId?: string;
}) {
  const [rows, setRows] = useState<KendaraanRow[]>(data);
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
      const res = await fetch(`${BASE_URL}/kendaraan/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus data');
      }
      setRows(prev => prev.filter(x => x.id !== id));
      toast.success('Kendaraan berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus data');
    }
  };

  return (
    <Table className="table-auto border-collapse w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Nama Pemilik</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">No. Kendaraan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Merek</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Jenis</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Dokumen</TableHead>
          {isAdmin && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell className="border px-4 py-2">{row.namaPemilik}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noKendaraan}</TableCell>
            <TableCell className="border px-4 py-2">{row.merek}</TableCell>
            <TableCell className="border px-4 py-2">{row.jenis}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.dokumen ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(row.dokumen!, `kendaraan-${row.noKendaraan}.pdf`)}
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
                  {/* (opsional) Halaman edit */}
                  {/* <Link href={`/users/userinfo/${userinfoId}/kendaraan/${row.id}/edit?userId=${userId}`}>
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
                        <AlertDialogTitle>Hapus Kendaraan?</AlertDialogTitle>
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
