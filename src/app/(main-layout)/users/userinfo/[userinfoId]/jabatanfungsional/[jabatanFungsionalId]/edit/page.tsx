'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import {
  JabatanFungsionalForm,
  JabatanFungsionalFormData,
} from '@/components/jabatanfungsional/jabatanfungsional-form';

export default function EditJabatanFungsionalPage() {
  const router = useRouter();
  const { userinfoId, jabatanFungsionalId } = useParams<{
    userinfoId: string;
    jabatanFungsionalId: string;
  }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [initialData, setInitialData] = useState<
    Partial<JabatanFungsionalFormData> | null
  >(null);
  const [loading, setLoading] = useState(false);

  const toYMD = (iso: string) => iso.split('T')[0];

  // Fetch data awal
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/jabatan-fungsional/${jabatanFungsionalId}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Gagal memuat data');
        const json = await res.json();
        const it = json.data;
        setInitialData({
          jabatanFungsional: it.jabatanFungsional,
          nomorSK: it.nomorSK,
          tanggalSK: toYMD(it.tanggalSK),
          tmt: toYMD(it.tmt),
          jenis: it.jenis,
          angkaKredit: String(it.angkaKredit),
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat Jabatan Fungsional');
        router.push(`/users/userinfo/${userinfoId}`);
      }
    })();
  }, [jabatanFungsionalId, userinfoId, router]);

  // Submit update
  const handleUpdate = async (data: JabatanFungsionalFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('jabatanFungsional', data.jabatanFungsional);
      fd.append('nomorSK', data.nomorSK);
      fd.append('tanggalSK', `${data.tanggalSK} 00:00:00.000`);
      fd.append('tmt', `${data.tmt} 00:00:00.000`);
      fd.append('jenis', data.jenis);
      fd.append('angkaKredit', data.angkaKredit.toString());
      if (data.fileSK) fd.append('fileSK', data.fileSK);

      const res = await fetch(
        `${BASE_URL}/jabatan-fungsional/${jabatanFungsionalId}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: fd,
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menyimpan perubahan');
      }

      toast.success('Jabatan Fungsional berhasil diperbarui');
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
      <ContentLayout title="Edit Jabatan Fungsional">
        <p className="mt-6 text-center text-gray-500">Memuat data…</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Edit Jabatan Fungsional">
      <UserBreadcrumb page="Edit Jabatan Fungsional" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Edit Jabatan Fungsional</CardTitle>
          </CardHeader>
          <CardContent>
            <JabatanFungsionalForm
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
