// src/app/(main-layout)/users/userinfo/[userinfoId]/riwayatpendidikan/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import {
  RiwayatPendidikanForm,
  RiwayatPendidikanFormData,
} from '@/components/riwayat-pendidikan/riwayat-pendidikan-form';

export default function AddRiwayatPendidikanPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Ambil userId dari endpoint /userinfo/:id
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/userinfo/${userinfoId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat data user');
        const json = await res.json();
        setUserId(json.data.user.id);
      } catch (e) {
        console.error(e);
        toast.error('Tidak bisa memuat data pengguna');
      }
    })();
  }, [userinfoId]);

  const handleCreate = async (formData: RiwayatPendidikanFormData) => {
    if (!userId) {
      toast.error('User ID belum tersedia');
      return;
    }
    setLoading(true);

    try {
      // Packing semua field ke FormData
      const fd = new FormData();
      fd.append('userId', userId);
      fd.append('pendidikan', formData.pendidikan);
      fd.append('namaInstitusi', formData.namaInstitusi);
      fd.append('tahunLulus', formData.tahunLulus);
      // Jika butuh upload file, misalnya:
      // fd.append('bukti', formData.buktiFile);

      const res = await fetch(`${BASE_URL}/pendidikan/${userId}`, {
        method: 'POST',
        credentials: 'include',
        body: fd, // kirim sebagai multipart/form-data
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
