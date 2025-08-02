'use client';

import React, { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import { JabatanStrukturalForm, JabatanStrukturalFormData } from '@/components/jabatanstruktural/jabatanstruktural-form';

export default function AddJabatanStrukturalPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [loading, setLoading] = useState(false);

  // helper: format tanggal backend jika perlu
  const formatDateTime = (d: string) => `${d} 00:00:00.000`;

  const handleCreate = async (data: JabatanStrukturalFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('userId', userId);
      fd.append('namaJabatan', data.namaJabatan);
      fd.append('nomorSK', data.nomorSK);
      fd.append('periodeMenjabat', data.periodeMenjabat);
      fd.append('skPemberhentian', data.skPemberhentian);
      fd.append('tmtPemberhentian', `${data.tmtPemberhentian}T00:00:00.000Z`);
      fd.append('tunjanganTetap', data.tunjanganTetap);
      fd.append('tunjanganVariabel', data.tunjanganVariabel);
      if (data.fileSK) fd.append('file', data.fileSK);

      const res = await fetch(`${BASE_URL}/jabatan-struktural/`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan jabatan struktural');
      }

      toast.success('Jabatan Struktural berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}?userId=${userId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Jabatan Struktural">
      <UserBreadcrumb page="Tambah Jabatan Struktural" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Jabatan Struktural</CardTitle>
          </CardHeader>
          <CardContent>
            <JabatanStrukturalForm
              onSubmit={handleCreate}
              loading={loading}
              cancelHref={`/users/userinfo/${userinfoId}`}
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
