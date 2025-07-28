// src/app/(main-layout)/users/userinfo/[userinfoId]/riwayatpendidikan/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import { RiwayatPendidikanForm, RiwayatPendidikanFormData } from '@/components/riwayat-pendidikan/riwayat-pendidikan-form';

export default function AddRiwayatPendidikanPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: RiwayatPendidikanFormData) => {
    setLoading(true);
    try {
      const payload = {
        userId,
        pendidikan: formData.pendidikan,
        namaInstitusi: formData.namaInstitusi,
        tahunLulus: Number(formData.tahunLulus),
      };
      const res = await fetch(`${BASE_URL}/pendidikan/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan riwayat pendidikan');
      }
      toast.success('Riwayat pendidikan berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Riwayat Pendidikan">
      <UserBreadcrumb page="Tambah Riwayat Pendidikan" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Riwayat Pendidikan</CardTitle>
          </CardHeader>
          <CardContent>
            <RiwayatPendidikanForm
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
