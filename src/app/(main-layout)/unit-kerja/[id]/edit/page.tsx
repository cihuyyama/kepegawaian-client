'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UnitKerjaBreadcrumb } from '@/components/unit-kerja/unit-kerja-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BASE_URL } from '@/constant/BaseURL';
import { UnitKerjaForm } from '@/components/unit-kerja/unit-kerja-form';

type UnitKerjaResp = {
  id: string;
  name: string;
  kepalaUnitKerjaId: string | null;
  Anggota: { id: string }[];
};

export default function EditUnitKerjaPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initial, setInitial] = useState<{
    name: string;
    kepalaUnitKerjaId: string | null;
    anggota: string[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Tidak ada GET /unit-kerja/{id}? Kalau tidak ada, ambil list lalu find
        const res = await fetch(`${BASE_URL}/unit-kerja`, { credentials: 'include' });
        const json = await res.json();
        const found: UnitKerjaResp | undefined = (json.data || []).find((u: any) => u.id === id);
        if (!found) {
          toast.error('Unit kerja tidak ditemukan');
          router.push('/unit-kerja');
          return;
        }
        setInitial({
          name: found.name,
          kepalaUnitKerjaId: found.kepalaUnitKerjaId,
          anggota: (found.Anggota || []).map((a) => a.id),
        });
      } catch (e) {
        console.error(e);
        toast.error('Gagal memuat data');
        router.push('/unit-kerja');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleUpdate = async (formData: {
    name: string;
    kepalaUnitKerjaId: string | null;
    anggota: string[];
  }) => {
    try {
      setSaving(true);

      // cek kepala tidak dobel
      if (formData.kepalaUnitKerjaId) {
        const rUnits = await fetch(`${BASE_URL}/unit-kerja`, { credentials: 'include' });
        const jUnits = await rUnits.json();
        const used = (jUnits.data || []).some(
          (u: any) =>
            u.id !== id && u.kepalaUnitKerjaId === formData.kepalaUnitKerjaId
        );
        if (used) {
          toast.error('User tersebut sudah menjadi kepala unit kerja lain.');
          return;
        }
      }

      const payload: any = { name: formData.name.trim() };
      if (formData.kepalaUnitKerjaId) payload.kepalaUnitKerjaId = formData.kepalaUnitKerjaId;
      if (formData.anggota?.length) payload.anggota = formData.anggota;

      const res = await fetch(`${BASE_URL}/unit-kerja/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = 'Gagal menyimpan data';
        try {
          const errJson = await res.json();
          msg = errJson?.message || msg;
          console.error('Server error JSON:', errJson);
        } catch {
          const raw = await res.text();
          console.error('Server error TEXT:', raw);
          msg = raw || msg;
        }
        throw new Error(msg);
      }

      toast.success('Unit Kerja berhasil diperbarui');
      router.push('/unit-kerja');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !initial) {
    return (
      <ContentLayout title="Edit Unit Kerja">
        <p className="p-6 text-gray-500">Memuat...</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Edit Unit Kerja">
      <UnitKerjaBreadcrumb page="Edit" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Edit Unit Kerja</CardTitle>
          </CardHeader>
          <CardContent>
            <UnitKerjaForm
              onSubmit={handleUpdate}
              loading={saving}
              initialValues={initial}
              currentUnitId={id}
              cancelHref="/unit-kerja"
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
