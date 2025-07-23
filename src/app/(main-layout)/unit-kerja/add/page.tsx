'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UnitKerjaBreadcrumb } from '@/components/unit-kerja/unit-kerja-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UnitKerjaForm } from '@/components/unit-kerja/unit-kerja-form';
import { BASE_URL } from '@/constant/BaseURL';

export default function CreateUnitKerjaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: {
    name: string;
    kepalaUnitKerjaId: string | null;
    anggota: string[];
  }) => {
    try {
      setLoading(true);

      // Cek kembali agar tidak dobel kepala
      if (formData.kepalaUnitKerjaId) {
        const rUnits = await fetch(`${BASE_URL}/unit-kerja`, { credentials: 'include' });
        const jUnits = await rUnits.json();
        const used = (jUnits.data || []).some(
          (u: any) => u.kepalaUnitKerjaId === formData.kepalaUnitKerjaId
        );
        if (used) {
          toast.error('User tersebut sudah menjadi kepala unit kerja lain.');
          return;
        }
      }

      const payload: any = { name: formData.name.trim() };
      if (formData.kepalaUnitKerjaId) payload.kepalaUnitKerjaId = formData.kepalaUnitKerjaId;
      if (formData.anggota?.length) payload.anggota = formData.anggota;

      console.log('payload =>', payload);

      const res = await fetch(`${BASE_URL}/unit-kerja`, {
        method: 'POST',
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

      toast.success('Unit Kerja berhasil ditambahkan');
      router.push('/unit-kerja');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Unit Kerja">
      <UnitKerjaBreadcrumb page="Tambah" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Unit Kerja</CardTitle>
          </CardHeader>
          <CardContent>
            <UnitKerjaForm onSubmit={handleCreate} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
