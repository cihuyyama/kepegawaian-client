'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BASE_URL } from '@/constant/BaseURL';

export default function EditInpasingPage() {
  const router = useRouter();
  const { userinfoId, inpasingId } = useParams<{
    userinfoId: string;
    inpasingId: string;
  }>();
  const search = useSearchParams();
  const userId = search.get('userId') ?? '';

  const [kepangkatan, setKepangkatan] = useState('');
  const [nomorSK, setNomorSK] = useState('');
  const [tanggalSK, setTanggalSK] = useState(''); // yyyy-MM-dd
  const [tmt, setTmt] = useState('');             // yyyy-MM-dd
  const [file, setFile] = useState<File | null>(null);
  const [initialFileUrl, setInitialFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Muat data awal
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/inpasing/${inpasingId}`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error('Gagal memuat inpasing');
        const json = await res.json();
        const it = json.data;
        setKepangkatan(it.kepangkatan);
        setNomorSK(it.nomorSK);
        setTanggalSK(it.tanggalSK.split('T')[0]);
        setTmt(it.tmt.split('T')[0]);
        setInitialFileUrl(
          it.file
            ? it.file.startsWith('http')
              ? it.file
              : `${process.env.NEXT_PUBLIC_DOMAIN}/${it.file}`
            : null
        );
      } catch (e: any) {
        console.error(e);
        toast.error(e.message || 'Gagal memuat inpasing');
        router.push(`/users/userinfo/${userinfoId}`);
      } finally {
        setFetching(false);
      }
    })();
  }, [inpasingId, router, userinfoId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('userId', userId);
      form.append('kepangkatan', kepangkatan);
      form.append('nomorSK', nomorSK);
      form.append('tanggalSK', tanggalSK);
      form.append('tmt', tmt);
      if (file) form.append('file', file);

      const res = await fetch(
        `${BASE_URL}/inpasing/${inpasingId}`,
        {
          method: 'PUT',
          credentials: 'include',
          body: form,
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menyimpan perubahan');
      }
      toast.success('Inpasing berhasil diperbarui');
      router.push(`/users/userinfo/${userinfoId}?userId=${userId}`);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Gagal memperbarui inpasing');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <ContentLayout title="Edit Inpasing">
        <p className="mt-6 text-center text-gray-500">Memuat data…</p>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Edit Inpasing">
      <UserBreadcrumb page="Edit Inpasing" />
      <div className="mt-6 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Inpasing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label htmlFor="kepangkatan" className="block text-sm font-medium text-gray-700">
                  Kepangkatan
                </label>
                <Input
                  id="kepangkatan"
                  value={kepangkatan}
                  onChange={e => setKepangkatan(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="nomorSK" className="block text-sm font-medium text-gray-700">
                  Nomor SK
                </label>
                <Input
                  id="nomorSK"
                  value={nomorSK}
                  onChange={e => setNomorSK(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="tanggalSK" className="block text-sm font-medium text-gray-700">
                  Tanggal SK
                </label>
                <Input
                  id="tanggalSK"
                  type="date"
                  value={tanggalSK}
                  onChange={e => setTanggalSK(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="tmt" className="block text-sm font-medium text-gray-700">
                  TMT
                </label>
                <Input
                  id="tmt"
                  type="date"
                  value={tmt}
                  onChange={e => setTmt(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  File SK
                </label>
                {initialFileUrl && (
                  <p className="text-sm mb-1">
                    File sekarang:{' '}
                    <a
                      href={initialFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      Lihat
                    </a>
                  </p>
                )}
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Menyimpan…' : 'Simpan'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => router.back()}>
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
