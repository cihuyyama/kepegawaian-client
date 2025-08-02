// src/components/dashboard/tables/dashboard-jabatan-struktural-table.tsx
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
import type { JabatanStrukturalRow } from '@/types';

interface DashboardJabatanStrukturalTableProps {
  data: JabatanStrukturalRow[];
  role: string;
  userinfoId: string;
  userId: string;
}

export function DashboardJabatanStrukturalTable({
  data,
  role,
  userinfoId,
  userId,
}: DashboardJabatanStrukturalTableProps) {
  const router = useRouter();
  const [rows, setRows] = useState<JabatanStrukturalRow[]>(data);

  // sinkronisasi prop → state
  useEffect(() => {
    setRows(data);
  }, [data]);

  // download dokumen SK
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

  // hapus jabatan struktural
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/jabatan-struktural/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus data');
      }
      setRows(r => r.filter(x => x.id !== id));
      toast.success('Jabatan Struktural berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus data');
    }
  };

  return (
    <Table className="table-auto w-full">
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Jabatan Struktural</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">No. SK</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Periode Menjabat</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">SK Pemberhentian</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">TMT Pemberhentian</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tunj. Tetap</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tunj. Variabel</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Dokumen SK</TableHead>
          {role === 'admin' && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className="hover:bg-gray-50">
            <TableCell className="border px-4 py-2">{row.jabatanStruktural}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.sk}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.periodeMenjabat}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.skPemberhentian || '-'}
            </TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.tmtPemberhentian || '-'}
            </TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tunjanganTetap}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tunjanganVariable}</TableCell>
            <TableCell className="border px-4 py-2 text-center">
              {row.dokumenSK ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleDownload(
                      row.dokumenSK!,
                      `jabstruk-${row.sk}.pdf`
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
              <TableCell className="border px-4 py-2 text-center space-x-2">
                <div className="flex items-center justify-center">
                  {/* <Link
                    href={`/users/userinfo/${userinfoId}/jabatanstruktural/${row.id}/edit?userId=${userId}`}
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
                        <AlertDialogTitle>Hapus Jabatan Struktural?</AlertDialogTitle>
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
