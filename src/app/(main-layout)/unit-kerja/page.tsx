'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { RefreshCcw, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { BASE_URL } from '@/constant/BaseURL';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

type User = {
  id: string;
  email: string;
  username: string;
  imgUrl: string;
  role: string;
};

type UnitKerja = {
  id: string;
  name: string;
  kepalaUnitKerjaId: string | null;
  createdAt: string;
  updatedAt: string;
  KepalaUnitKerja: User | null;
  Anggota: User[];
};

export default function UnitKerjaPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [units, setUnits] = useState<UnitKerja[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // role
        const r = await fetch(`${BASE_URL}/users/access-token`, { credentials: 'include' });
        const j = await r.json();
        setRole(j.data?.role ?? null);
      } catch {
        setRole(null);
      }

      // units
      await fetchUnits();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUnits = async () => {
    try {
      setLoadingUnits(true);
      const r = await fetch(`${BASE_URL}/unit-kerja`, { credentials: 'include' });
      const j = await r.json();
      setUnits(j.data || []);
    } catch (e) {
      console.error(e);
      toast.error('Gagal memuat unit kerja');
    } finally {
      setLoadingUnits(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return units.filter((u) =>
      [u.name, u.KepalaUnitKerja?.username ?? ''].join(' ').toLowerCase().includes(q)
    );
  }, [units, search]);

  const refreshUnits = async () => {
    await fetchUnits();
  };

  const handleDelete = async (id: string) => {
    await toast.promise(
      (async () => {
        const res = await fetch(`${BASE_URL}/unit-kerja/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (!res.ok) {
          let msg = 'Gagal menghapus';
          try {
            const j = await res.json();
            msg = j?.message || msg;
          } catch {
            msg = await res.text();
          }
          throw new Error(msg);
        }
        setUnits((prev) => prev.filter((u) => u.id !== id));
      })(),
      {
        loading: 'Menghapus...',
        success: 'Unit kerja terhapus',
        error: (e) => e.message || 'Gagal menghapus',
      }
    );
  };

  if (loading) return <p className="p-6 text-gray-500">Memuat...</p>;
  if (role !== 'admin') return <p className="p-6 text-red-500">Anda tidak memiliki akses.</p>;

  return (
    <ContentLayout title="Unit Kerja">
      <Card className="mt-6">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <CardTitle>Daftar Unit Kerja</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Input
              placeholder="Cari unit kerja..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-[220px]"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={refreshUnits}
              disabled={loadingUnits}
              title="Refresh"
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
            <Link href="/unit-kerja/add">
              <Button variant="success" className="flex items-center gap-1">
                <Plus className="w-4 h-4" /> Tambah
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <UnitKerjaTable data={filtered} loading={loadingUnits} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}

function UnitKerjaTable({
  data,
  loading,
  onDelete,
}: {
  data: UnitKerja[];
  loading: boolean;
  onDelete: (id: string) => void;
}) {
  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (!data.length) return <p className="text-gray-500">Tidak ada data.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-2">Nama</th>
            <th className="py-2 px-2">Kepala Unit</th>
            <th className="py-2 px-2">Jumlah Anggota</th>
            <th className="py-2 px-2">Dibuat</th>
            <th className="py-2 px-2 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-2">{u.name}</td>
              <td className="py-2 px-2">
                {u.KepalaUnitKerja ? u.KepalaUnitKerja.username : '-'}
              </td>
              <td className="py-2 px-2">{u.Anggota?.length || 0}</td>
              <td className="py-2 px-2">
                {new Date(u.createdAt).toLocaleDateString('id-ID')}
              </td>
              <td className="py-2 px-2 text-right space-x-2">
                <Link href={`/unit-kerja/${u.id}/edit`}>
                  <Button size="sm" variant="outline" className="inline-flex gap-1">
                    Edit
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4 text-black" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Unit Kerja?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => onDelete(u.id)}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
