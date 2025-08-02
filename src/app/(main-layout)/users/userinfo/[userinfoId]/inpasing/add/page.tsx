// src/app/(main-layout)/users/userinfo/[userinfoId]/inpasing/add/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import { InpasingForm, InpasingFormData } from '@/components/inpasing/inpasing-form';

export default function AddInpasingPage(): JSX.Element {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;
  const [loading, setLoading] = useState(false);

  // backend ingin datetime lengkap
  const formatDateTime = (d: string) => `${d} 00:00:00.000`;

  const handleCreate = async (data: InpasingFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('userId', userId);
      fd.append('kepangkatan', data.kepangkatan);
      fd.append('nomorSK', data.nomorSK);
      fd.append('tanggalSK', formatDateTime(data.tanggalSK));
      fd.append('tmt', formatDateTime(data.tmt));
      if (data.fileSK) fd.append('file', data.fileSK);

      const res = await fetch(`${BASE_URL}/inpasing/`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan inpasing');
      }

      toast.success('Inpasing berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}?userId=${userId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Inpasing">
      <UserBreadcrumb page="Tambah Inpasing" />
      <div className="mt-6 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Inpasing</CardTitle>
          </CardHeader>
          <CardContent>
            <InpasingForm
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
