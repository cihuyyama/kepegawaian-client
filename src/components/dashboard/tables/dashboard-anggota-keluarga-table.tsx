// src/components/dashboard/tables/dashboard-anggota-keluarga-table.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { Trash2, Pencil } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';
import type { AnggotaKeluargaRow } from '@/types';

interface DashboardAnggotaKeluargaTableProps {
  data: AnggotaKeluargaRow[];
  role: string;
  userinfoId: string;
  userId: string;
}

export function DashboardAnggotaKeluargaTable({
  data,
  role,
  userinfoId,
  userId,
}: DashboardAnggotaKeluargaTableProps) {
  const router = useRouter();

  // local rows state for optimistic update
  const [rows, setRows] = useState<AnggotaKeluargaRow[]>(data);
  useEffect(() => setRows(data), [data]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/keluarga/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menghapus data');
      }
      setRows(prev => prev.filter(r => r.id !== id));
      toast.success('Data berhasil dihapus');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Gagal menghapus data');
    }
  };

  return (
    <Table className="table-auto border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Nama
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Tempat Lahir
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Agama
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Jenis Kelamin
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            NIK
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Pendidikan
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Hubungan
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Tjg. Beras
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Tjg. Keluarga
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Pot. Asuransi
          </TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
            Pot. Pajak
          </TableHead>
          {role === 'admin' && (
            <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">
              Aksi
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell className="border px-4">{row.nama}</TableCell>
            <TableCell className="border px-4">{row.tempatLahir}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.agama}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.jenisKelamin}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.nik}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.pendidikan}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.hubunganKeluarga}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tunjanganBeras}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tunjanganKeluarga}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.potonganAsuransi}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tanggunganPajak}</TableCell>
            {role === 'admin' && (
              <TableCell className="border px-4 py-2 text-center">
                <div className="flex justify-center items-center space-x-2">
                  {/* Edit icon */}
                  <Link
                    href={`/users/userinfo/${userinfoId}/keluarga/${row.id}/edit?userId=${userId}`}
                  >
                    <Button size="icon" variant="ghost">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  {/* Delete icon */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="ghost" onClick={e => e.stopPropagation()}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={e => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Anggota Keluarga?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Data ini akan dihapus permanen. Apakah Anda yakin?
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
