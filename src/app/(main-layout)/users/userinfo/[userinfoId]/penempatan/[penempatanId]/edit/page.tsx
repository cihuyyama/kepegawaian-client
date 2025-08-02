'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PenempatanForm, PenempatanFormData } from '@/components/penempatan/penempatan-form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';

const toISODateInput = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso; // kalau backend sudah 'YYYY-MM-DD'
  return d.toISOString().split('T')[0];
};

export default function EditPenempatanPage() {
  const { userinfoId, penempatanId } = useParams<{ userinfoId: string; penempatanId: string }>();
  const sp = useSearchParams();
  const userId = sp.get('userId') || '';
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initial, setInitial] = useState<Partial<PenempatanFormData> | null>(null);

  // Load detail
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/penempatan/${penempatanId}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Gagal memuat detail penempatan');
        const j = await res.json();

        const it = j.data;
        setInitial({
          userId: it.userId || userId,
          unitKerja: it.unitKerja || '',
          nomorSK: it.nomorSK || it.NomorSK || '',
          tanggalSK: toISODateInput(it.tanggalSK || it.TanggalSK),
          tmt: toISODateInput(it.tmt || it.TMT),
        });
      } catch (e: any) {
        toast.error(e.message || 'Gagal memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, [penempatanId, userId]);

  const handleSubmit = async (data: PenempatanFormData) => {
    setSaving(true);
    try {
      const form = new FormData();
      form.append('userId', data.userId || userId);
      form.append('unitKerja', data.unitKerja);
      form.append('nomorSK', data.nomorSK);
      form.append('tanggalSK', data.tanggalSK);
      form.append('tmt', data.tmt);
      if (data.file) form.append('file', data.file); // opsional

      const res = await fetch(`${BASE_URL}/penempatan/${penempatanId}`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
      });

      if (!res.ok) {
        let msg = 'Gagal memperbarui penempatan';
        try { const j = await res.json(); msg = j?.message || msg; } catch { }
        throw new Error(msg);
      }

      toast.success('Penempatan diperbarui');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (e: any) {
      toast.error(e.message || 'Gagal simpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Hapus data penempatan ini?')) return;
    try {
      const res = await fetch(`${BASE_URL}/penempatan/${penempatanId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Gagal menghapus penempatan');
      toast.success('Penempatan dihapus');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  if (loading) return <p className="mt-6 text-center text-gray-500">Memuat...</p>;

  return (
    <ContentLayout title="Edit Penempatan">
      <UserBreadcrumb page="Penempatan - Edit" />
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Ubah Penempatan</CardTitle>
          <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
        </CardHeader>
        <CardContent>
          <PenempatanForm
            initialData={{ ...(initial || {}), userId }}
            onSubmit={handleSubmit}
            cancelHref={`/users/userinfo/${userinfoId}`}
            loading={saving}
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
