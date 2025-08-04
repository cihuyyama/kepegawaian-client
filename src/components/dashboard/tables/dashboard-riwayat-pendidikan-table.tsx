// src/components/dashboard/tables/dashboard-riwayat-pendidikan-table.tsx
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
import type { RiwayatPendidikanRow, DokumenRow } from '@/types';
import { Pencil, Trash2, ChevronRight, Download, FilePlus } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';

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

  const isAdmin = role === 'admin';

  // Download dokumen by full URL
  const handleDownload = useCallback(
    async (url: string, filename: string) => {
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
    },
    []
  );

  // Delete entire riwayat pendidikan entry
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
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success('Data berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus data');
    }
  };

  // Delete a single document by documentId, scoped to a given row
  const handleDeleteDocument = async (documentId: string, rowId: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/pendidikan/dokumen/${documentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus dokumen');
      }
      setRows((prev) =>
        prev.map((row) =>
          row.id === rowId
            ? { ...row, dokumen: row.dokumen.filter((d) => d.id !== documentId) }
            : row
        )
      );
      toast.success('Dokumen berhasil dihapus');
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal menghapus dokumen');
    }
  };

  return (
    <Table className="table-auto border-collapse w-full">
      <TableHeader>
        <TableRow>
          {/* kolom expand always */}
          <TableHead className="border px-4 py-2 text-center bg-gray-100" />
          <TableHead className="border px-4 py-2 text-center bg-gray-100">Pendidikan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100">Nama Institusi</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100">Tahun Lulus</TableHead>
          {/* hanya tampilkan header Aksi jika admin */}
          {isAdmin && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <RiwayatRow
            key={row.id}
            row={row}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onDeleteDoc={handleDeleteDocument}
            userinfoId={userinfoId}
            userId={userId}
            isAdmin={isAdmin}
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
  onDeleteDoc: (documentId: string, rowId: string) => void;
  userinfoId: string;
  userId: string;
  isAdmin: boolean;
}

function RiwayatRow({
  row,
  onDelete,
  onDownload,
  onDeleteDoc,
  userinfoId,
  userId,
  isAdmin,
}: RiwayatRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className="hover:bg-gray-50">
        {/* expand toggle */}
        <TableCell className="border px-4 py-2 text-center">
          <button
            onClick={() => setOpen((o) => !o)}
            className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded transition-transform ${open ? 'bg-gray-100 rotate-90' : ''}`}
            title={open ? 'Sembunyikan detail' : 'Lihat detail'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </TableCell>

        <TableCell className="border px-4 py-2">{row.pendidikan}</TableCell>
        <TableCell className="border px-4 py-2">{row.namaInstitusi}</TableCell>
        <TableCell className="border px-4 py-2 text-center">{row.tahunLulus}</TableCell>

        {/* hanya tampilkan cell Aksi jika admin */}
        {isAdmin && (
          <TableCell className="border px-4 py-2 text-center space-x-2">
            <Link
              href={`/users/userinfo/${userinfoId}/riwayatpendidikan/${row.id}/dokumen/add?userId=${userId}`}
            >
              <Button size="icon" variant="ghost" title="Tambah Dokumen">
                <FilePlus className="w-4 h-4 text-green-600" />
              </Button>
            </Link>
            <Link
              href={`/users/userinfo/${userinfoId}/riwayatpendidikan/${row.id}/edit?userId=${userId}`}
            >
              <Button size="icon" variant="ghost" title="Edit">
                <Pencil className="w-4 h-4" />
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="ghost" title="Hapus Riwayat">
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
          </TableCell>
        )}
      </TableRow>

      {open && (
        <TableRow>
          {/* colSpan dinamis: 5 jika admin, 4 jika bukan */}
          <TableCell colSpan={isAdmin ? 5 : 4} className="p-0 border-0">
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="border px-3 py-1 bg-gray-50 text-center">Dokumen</TableHead>
                  <TableHead className="border px-3 py-1 bg-gray-50 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {row.dokumen.length ? (
                  row.dokumen.map((d: DokumenRow, i: number) => {
                    const filename = d.namaDokumen.trim() || 'dokumen';
                    const downloadUrl = `${BASE_URL}/pendidikan/dokumen/${d.id}`;
                    return (
                      <TableRow key={i}>
                        <TableCell className="border px-3 py-1">{filename}</TableCell>
                        <TableCell className="border px-3 py-1 text-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDownload(downloadUrl, filename)}
                            title="Unduh dokumen"
                          >
                            <Download className="w-4 h-4 text-blue-500" />
                          </Button>
                          {isAdmin && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Hapus Dokumen"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hapus Dokumen?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Dokumen akan terhapus permanen.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => onDeleteDoc(d.id, row.id)}
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
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
