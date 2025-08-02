'use client';

import React, { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import {
  PenempatanForm,
  PenempatanFormData,
} from '@/components/penempatan/penempatan-form';

export default function AddPenempatanPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: PenempatanFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('userId', userId); // force dari query agar aman
      fd.append('unitKerja', data.unitKerja);
      fd.append('nomorSK', data.nomorSK);
      fd.append('tanggalSK', data.tanggalSK); // 'YYYY-MM-DD'
      fd.append('tmt', data.tmt);             // 'YYYY-MM-DD'
      if (data.file) fd.append('file', data.file);

      const res = await fetch(`${BASE_URL}/penempatan/`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan penempatan');
      }

      toast.success('Penempatan berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}?userId=${userId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Penempatan">
      <UserBreadcrumb page="Tambah Penempatan" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Penempatan</CardTitle>
          </CardHeader>
          <CardContent>
            <PenempatanForm
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
