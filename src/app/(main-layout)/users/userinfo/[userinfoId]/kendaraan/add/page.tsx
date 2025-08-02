// src/app/(main-layout)/users/userinfo/[userinfoId]/kendaraan/add/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import { KendaraanForm, KendaraanFormData } from '@/components/kendaraan/kendaraan-form';

export default function AddKendaraanPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: KendaraanFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('userId', userId);
      fd.append('namaPemilik', data.namaPemilik);
      fd.append('nomorKendaraan', data.nomorKendaraan);
      fd.append('merek', data.merek);
      fd.append('jenis', data.jenis);
      if (data.file) fd.append('file', data.file);

      const res = await fetch(`${BASE_URL}/kendaraan/`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan kendaraan');
      }

      toast.success('Kendaraan berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}?userId=${userId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Kendaraan">
      <UserBreadcrumb page="Tambah Kendaraan" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <KendaraanForm
              initialData={{ userId }}
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
