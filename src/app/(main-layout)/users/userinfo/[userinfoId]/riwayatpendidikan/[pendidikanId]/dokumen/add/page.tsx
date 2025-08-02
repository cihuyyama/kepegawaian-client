'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';

export default function AddDokumenRiwayatPendidikanPage() {
  const router = useRouter();
  const { userinfoId, pendidikanId } = useParams<{
    userinfoId: string;
    pendidikanId: string;
  }>();
  const search = useSearchParams();
  const userId = search.get('userId') ?? '';

  const [namaDokumen, setNamaDokumen] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Pilih file terlebih dahulu');
      return;
    }
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append('pendidikanId', pendidikanId);
      form.append('namaDokumen', namaDokumen);
      form.append('file', file);

      const res = await fetch(`${BASE_URL}/pendidikan/dokumen/${pendidikanId}`, {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambahkan dokumen');
      }
      toast.success('Dokumen berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContentLayout title="Tambah Dokumen Riwayat Pendidikan">
      <UserBreadcrumb page="Tambah Dokumen" />
      <div className="mt-6 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Dokumen</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="namaDokumen"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama Dokumen
                </label>
                <Input
                  id="namaDokumen"
                  type="text"
                  value={namaDokumen}
                  onChange={(e) => setNamaDokumen(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pilih File
                </label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Mengunggah…' : 'Unggah'}
                </Button>
                <Button variant="ghost" onClick={() => router.back()}>
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
