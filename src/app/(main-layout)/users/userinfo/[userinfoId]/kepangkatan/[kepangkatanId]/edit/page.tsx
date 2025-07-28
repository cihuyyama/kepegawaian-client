// src/app/(main-layout)/users/userinfo/[userinfoId]/kepangkatan/[kepangkatanId]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BASE_URL } from '@/constant/BaseURL';
import { KepangkatanForm, KepangkatanFormData } from '@/components/kepangkatan/kepangkatan-form';

export default function EditKepangkatanPage() {
  const router = useRouter();
  const { userinfoId, kepangkatanId } = useParams<{
    userinfoId: string;
    kepangkatanId: string;
  }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [initialData, setInitialData] = useState<Partial<KepangkatanFormData> | null>(null);
  const [loading, setLoading] = useState(false);

  // Convert ISO timestamp to YYYY-MM-DD
  const toYMD = (iso: string) => iso.split('T')[0];

  // 1) Fetch existing kepangkatan data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/kepangkatan/${kepangkatanId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Gagal memuat data kepangkatan');
        const json = await res.json();
        const it = json.data;
        setInitialData({
          nama: it.nama,
          NomorSK: it.NomorSK,
          TanggalSK: toYMD(it.TanggalSK),
          TMT: toYMD(it.TMT),
          TanggalAkhirKontrak: it.TanggalAkhirKontrak ? toYMD(it.TanggalAkhirKontrak) : '',
          JenisSK: it.JenisSK,
          GajiPokok: String(it.GajiPokok),
          // fileSK: null   // always leave fileSK null initially
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat kepangkatan');
        router.push(`/users/userinfo/${userinfoId}`);
      }
    })();
  }, [kepangkatanId, userinfoId, router]);

  // 2) Handle form submit -> PUT to /api/v1/kepangkatan/{id}
  const handleUpdate = async (data: KepangkatanFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('nama', data.nama);
      fd.append('NomorSK', data.NomorSK);
      fd.append('TanggalSK', `${data.TanggalSK} 00:00:00.000`);
      fd.append('TMT', `${data.TMT} 00:00:00.000`);
      if (data.TanggalAkhirKontrak) {
        fd.append('TanggalAkhirKontrak', `${data.TanggalAkhirKontrak} 00:00:00.000`);
      }
      fd.append('JenisSK', data.JenisSK);
      fd.append('GajiPokok', data.GajiPokok);
      if (data.fileSK) {
        fd.append('fileSK', data.fileSK);
      }

      const res = await fetch(`${BASE_URL}/kepangkatan/${kepangkatanId}`, {
        method: 'PUT',
        credentials: 'include',
        body: fd,
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Gagal menyimpan perubahan');
      }

      toast.success('Kepangkatan berhasil diperbarui');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  if (initialData === null) {
    return (
      <ContentLayout title="Edit Kepangkatan">
        <p className="mt-6 text-center text-gray-500">Memuat data…</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Edit Kepangkatan">
      <UserBreadcrumb page="Edit Kepangkatan" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Edit Kepangkatan</CardTitle>
          </CardHeader>
          <CardContent>
            <KepangkatanForm
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
