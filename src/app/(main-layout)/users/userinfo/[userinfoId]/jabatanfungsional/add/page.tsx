'use client';

import { useState } from 'react';
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

export default function AddJabatanFungsionalPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const search = useSearchParams();
  const userId = search.get('userId');

  const [loading, setLoading] = useState(false);

  const formatDateTime = (d: string) => `${d} 00:00:00.000`;

  const handleCreate = async (formData: JabatanFungsionalFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('jabatanFungsional', formData.jabatanFungsional);
      fd.append('nomorSK', formData.nomorSK);
      fd.append('tanggalSK', formatDateTime(formData.tanggalSK));
      fd.append('tmt', formatDateTime(formData.tmt));
      fd.append('jenis', formData.jenis);
      fd.append('angkaKredit', formData.angkaKredit.toString());
      if (formData.fileSK) fd.append('fileSK', formData.fileSK);

      const res = await fetch(
        `${BASE_URL}/jabatan-fungsional/${userId}`,
        {
          method: 'POST',
          credentials: 'include',
          body: fd,
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan Jabatan Fungsional');
      }

      toast.success('Jabatan Fungsional berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Jabatan Fungsional">
      <UserBreadcrumb page="Tambah Jabatan Fungsional" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Jabatan Fungsional</CardTitle>
          </CardHeader>
          <CardContent>
            <JabatanFungsionalForm
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
