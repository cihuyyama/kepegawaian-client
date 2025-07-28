// src/app/(main-layout)/users/userinfo/[userinfoId]/kepangkatan/add/page.tsx
'use client';

import { useState } from 'react';
import {
  useRouter,
  useParams,
  useSearchParams,
} from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import { KepangkatanForm } from '@/components/kepangkatan/kepangkatan-form';

export default function AddKepangkatanPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId');  // <— di‐oper dari DashboardInfo

  const [loading, setLoading] = useState(false);



  const formatDateTime = (d: string) => `${d} 00:00:00.000`;

  const handleCreate = async (formData: {
    nama: string;
    NomorSK: string;
    TanggalSK: string;
    TMT: string;
    TanggalAkhirKontrak: string;
    JenisSK: string;
    GajiPokok: string;
    fileSK: File | null;
  }) => {
    setLoading(true);
    try {
      // 1) bangun FormData tanpa userId
      const fd = new FormData();
      fd.append('nama', formData.nama);
      fd.append('NomorSK', formData.NomorSK);
      fd.append('TanggalSK', formatDateTime(formData.TanggalSK));
      fd.append('TMT', formatDateTime(formData.TMT));
      if (formData.TanggalAkhirKontrak) {
        fd.append(
          'TanggalAkhirKontrak',
          formatDateTime(formData.TanggalAkhirKontrak)
        );
      }
      fd.append('JenisSK', formData.JenisSK);
      fd.append('GajiPokok', formData.GajiPokok.toString());
      if (formData.fileSK) {
        fd.append('fileSK', formData.fileSK);
      }

      // 2) POST ke /api/v1/kepangkatan/{userId}
      const res = await fetch(
        `${BASE_URL}/kepangkatan/${userId}`,
        {
          method: 'POST',
          credentials: 'include',
          body: fd,
        }
      );

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Gagal menambahkan kepangkatan');
      }

      toast.success('Kepangkatan berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Kepangkatan">
      <UserBreadcrumb page="Tambah Kepangkatan" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Kepangkatan</CardTitle>
          </CardHeader>
          <CardContent>
            <KepangkatanForm
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
