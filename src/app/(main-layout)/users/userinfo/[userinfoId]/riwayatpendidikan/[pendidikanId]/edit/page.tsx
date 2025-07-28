// src/app/(main-layout)/users/userinfo/[userinfoId]/riwayatpendidikan/[pendidikanId]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import { RiwayatPendidikanForm, RiwayatPendidikanFormData } from '@/components/riwayat-pendidikan/riwayat-pendidikan-form';

export default function EditRiwayatPendidikanPage() {
  const router = useRouter();
  const { userinfoId, pendidikanId } = useParams<{
    userinfoId: string;
    pendidikanId: string;
  }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [initialData, setInitialData] = useState<Partial<RiwayatPendidikanFormData> | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch detail
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/pendidikan/user/${userId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat data');
        const json = await res.json();
        const found = (json.data || []).find((x: any) => x.id === pendidikanId);
        if (!found) throw new Error('Data tidak ditemukan');
        setInitialData({
          pendidikan: found.pendidikan,
          namaInstitusi: found.namaInstitusi,
          tahunLulus: String(found.tahunLulus),
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat riwayat pendidikan');
        router.push(`/users/userinfo/${userinfoId}`);
      }
    })();
  }, [userId, pendidikanId, userinfoId, router]);

  const handleUpdate = async (formData: RiwayatPendidikanFormData) => {
    setLoading(true);
    try {
      const payload = {
        userId,
        pendidikan: formData.pendidikan,
        namaInstitusi: formData.namaInstitusi,
        tahunLulus: Number(formData.tahunLulus),
      };
      const res = await fetch(`${BASE_URL}/pendidikan/${pendidikanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menyimpan perubahan');
      }
      toast.success('Riwayat pendidikan berhasil diperbarui');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <ContentLayout title="Edit Riwayat Pendidikan">
        <p className="mt-6 text-center text-gray-500">Memuat data…</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Edit Riwayat Pendidikan">
      <UserBreadcrumb page="Edit Riwayat Pendidikan" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Riwayat Pendidikan</CardTitle>
          </CardHeader>
          <CardContent>
            <RiwayatPendidikanForm
              initialData={initialData}
              onSubmit={handleUpdate}
              loading={loading}
              cancelHref={`/users/userinfo/${userinfoId}`}
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
