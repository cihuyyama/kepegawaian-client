'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';
import {
  JabatanStrukturalForm,
  JabatanStrukturalFormData,
} from '@/components/jabatanstruktural/jabatanstruktural-form';

export default function EditJabatanStrukturalPage() {
  const router = useRouter();
  const { userinfoId, jsId } = useParams<{
    userinfoId: string;
    jsId: string;
  }>();
  const search = useSearchParams();
  const userId = search.get('userId')!;

  const [initialData, setInitialData] = useState<Partial<JabatanStrukturalFormData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // helper tanggal
  const toDate = (iso: string) => iso.split('T')[0];
  const formatDateTime = (d: string) => `${d} 00:00:00.000`;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/jabatan-struktural/${jsId}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Gagal memuat data');
        const json = await res.json();
        const it = json.data;
        setInitialData({
          namaJabatan: it.namaJabatan,
          nomorSK: it.nomorSK,
          periodeMenjabat: it.periodeMenjabat,
          skPemberhentian: it.skPemberhentian,
          tmtPemberhentian: toDate(it.tmtPemberhentian),
          tunjanganTetap: it.tunjanganTetap,
          tunjanganVariabel: it.tunjanganVariabel,
        });
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'Gagal memuat jabatan struktural');
        router.push(`/users/userinfo/${userinfoId}`);
      } finally {
        setFetching(false);
      }
    })();
  }, [jsId, router, userinfoId]);

  const handleUpdate = async (data: JabatanStrukturalFormData) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('userId', userId);
      fd.append('namaJabatan', data.namaJabatan);
      fd.append('nomorSK', data.nomorSK);
      fd.append('periodeMenjabat', data.periodeMenjabat);
      fd.append('skPemberhentian', data.skPemberhentian);
      fd.append('tmtPemberhentian', formatDateTime(data.tmtPemberhentian));
      fd.append('tunjanganTetap', data.tunjanganTetap);
      fd.append('tunjanganVariabel', data.tunjanganVariabel);
      if (data.fileSK) fd.append('file', data.fileSK);

      const res = await fetch(
        `${BASE_URL}/api/v1/jabatan-struktural/${jsId}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: fd,
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal memperbarui jabatan struktural');
      }

      toast.success('Jabatan Struktural berhasil diperbarui');
      router.push(`/users/userinfo/${userinfoId}?userId=${userId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  if (fetching || !initialData) {
    return (
      <ContentLayout title="Edit Jabatan Struktural">
        <p className="mt-6 text-center text-gray-500">Memuat data…</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Edit Jabatan Struktural">
      <UserBreadcrumb page="Edit Jabatan Struktural" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Jabatan Struktural</CardTitle>
          </CardHeader>
          <CardContent>
            <JabatanStrukturalForm
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
