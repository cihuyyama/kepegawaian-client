// src/components/dashboard/tables/dashboard-inpasing-table.tsx
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
import { Download, Trash2, Pencil } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';
import type { InpasingRow } from '@/types';

interface DashboardInpasingTableProps {
  data: InpasingRow[];
  role: string;
  userinfoId: string;
  userId: string;
}

export function DashboardInpasingTable({
  data,
  role,
  userinfoId,
  userId,
}: DashboardInpasingTableProps) {
  const router = useRouter();
  const [rows, setRows] = useState<InpasingRow[]>(data);

  // sinkronisasi prop → state
  useEffect(() => {
    setRows(data);
  }, [data]);

  // download dokumen SK via fetch→blob
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

  // hapus record inpasing
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/inpasing/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus inpasing');
      }
      setRows(prev => prev.filter(r => r.id !== id));
      toast.success('Inpasing berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus inpasing');
    }
  };

  return (
    <Table className="table-auto w-full">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Kepangkatan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">No. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tgl. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">TMT</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Dokumen SK</TableHead>
          {role === 'admin' && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell className="border px-4 py-2">{row.kepangkatan}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.noSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tglSK}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tmt}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.dokumenSK ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleDownload(
                      row.dokumenSK!,
                      `inpasing-${row.noSK}.pdf`
                    )
                  }
                >
                  <Download className="h-5 w-5 text-blue-500" />
                </Button>
              ) : (
                '-'
              )}
            </TableCell>
            {role === 'admin' && (
              <TableCell className="border px-4 py-2 text-center">
                <div className="flex items-center justify-center space-x-2">
                  {/* <Link
                    href={`/users/userinfo/${userinfoId}/inpasing/${row.id}/edit?userId=${userId}`}
                  >
                    <Button size="icon" variant="ghost">
                      <Pencil className="w-4 h-4 text-green-600" />
                    </Button>
                  </Link> */}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={e => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Inpasing?</AlertDialogTitle>
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
