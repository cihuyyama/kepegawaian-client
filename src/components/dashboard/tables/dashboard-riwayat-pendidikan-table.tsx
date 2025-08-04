'use client';

import Link from 'next/link';
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
import { RiwayatPendidikanRow } from '@/types';
import { Pencil, Trash2, ChevronRight, Download, FilePlus } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';
import { cn } from '@/lib/utils';

interface Props {
  data: RiwayatPendidikanRow[];
  role: string;
  userinfoId: string;
  userId: string;
}

export function DashboardRiwayatPendidikanTable({
  data,
  role,
  userinfoId,
  userId,
}: Props) {
  const [rows, setRows] = useState<RiwayatPendidikanRow[]>(data);
  useEffect(() => setRows(data), [data]);

  // === download dokumen (pakai fetch + credentials) ===
  const handleDownload = useCallback(async (url: string, filename: string) => {
    try {
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error('Gagal mengunduh dokumen');
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename || 'dokumen';
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
      const res = await fetch(`${BASE_URL}/pendidikan/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus data');
      }
      setRows(r => r.filter(x => x.id !== id));
      toast.success('Data berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus data');
    }
  };

  return (
    <Table className="table-auto border-collapse w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800" />
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Pendidikan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Nama Institusi</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tahun Lulus</TableHead>
          {role === 'admin' && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <RiwayatRow
            key={row.id}
            row={row}
            onDelete={handleDelete}
            onDownload={handleDownload}
            userinfoId={userinfoId}
            userId={userId}
            isAdmin={role === 'admin'}
          />
        ))}
      </TableBody>
    </Table>
  );
}

interface RiwayatRowProps {
  row: RiwayatPendidikanRow;
  onDelete: (id: string) => void;
  onDownload: (url: string, filename: string) => void;
  userinfoId: string;
  userId: string;
  isAdmin: boolean;
}

function RiwayatRow({
  row,
  onDelete,
  onDownload,
  userinfoId,
  userId,
  isAdmin,
}: RiwayatRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className="hover:bg-gray-50">
        <TableCell className="border px-4 py-2 text-center">
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "w-8 h-8 flex items-center justify-center border border-gray-300 rounded transition-all",
              open && "bg-gray-100"
            )}
            title={open ? "Sembunyikan detail" : "Lihat detail"}
          >
            <ChevronRight
              className={cn("w-4 h-4 transition-transform", open && "rotate-90")}
            />
          </button>
        </TableCell>
        <TableCell className="border px-4 py-2">{row.pendidikan}</TableCell>
        <TableCell className="border px-4 py-2">{row.namaInstitusi}</TableCell>
        <TableCell className="border px-4 py-2 text-center">{row.tahunLulus}</TableCell>
        {isAdmin && (
          <TableCell className="border px-4 py-2 text-center space-x-2">
            <div className="flex justify-center items-center space-x-2">
              <Link
                href={`/users/userinfo/${userinfoId}/riwayatpendidikan/${row.id}/dokumen/add?userId=${userId}`}
              >
                <Button size="icon" variant="ghost" title="Tambah Dokumen" >
                  <FilePlus className="w-4 h-4 text-green-600" />
                </Button>
              </Link>
              <Link
                href={`/users/userinfo/${userinfoId}/riwayatpendidikan/${row.id}/edit?userId=${userId}`}
              >
                <Button size="icon" variant="ghost">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Riwayat Pendidikan?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => onDelete(row.id)}
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

      {open && (
        <TableRow>
          <TableCell colSpan={isAdmin ? 5 : 4} className="p-0 border-0">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="border px-3 py-1 bg-gray-50 text-center">Dokumen</TableHead>
                  <TableHead className="border px-3 py-1 bg-gray-50 text-center">Unduh</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {row.dokumen.length ? (
                  row.dokumen.map((d, i) => {
                    const filename = d.namaDokumen?.trim() || 'dokumen';
                    return (
                      <TableRow key={i}>
                        <TableCell className="border px-3 py-1">{filename}</TableCell>
                        <TableCell className="border px-3 py-1 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDownload(d.url, filename)}
                            title="Unduh dokumen"
                          >
                            <Download className="w-4 h-4 text-blue-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell className="border px-3 py-2 text-gray-500" colSpan={2}>
                      Tidak ada dokumen
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
