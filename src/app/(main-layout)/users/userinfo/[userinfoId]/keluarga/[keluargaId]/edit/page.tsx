'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/constant/BaseURL';

export default function EditAnggotaKeluargaPage() {
  const router = useRouter();
  const { userinfoId, keluargaId } = useParams<{
    userinfoId: string;
    keluargaId: string;
  }>();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId')!;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    tempatLahir: '',
    agama: '',
    jenisKelamin: '',
    nik: '',
    pendidikan: '',
    hubunganKeluarga: '',
    tunjanganBeras: '',
    tunjanganKeluarga: '',
    potonganAsuransi: '',
    tanggunganPajak: '',
  });

  // 1) Load existing data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/keluargauser/${userId}`, {
          credentials: 'include',
        });
        const json = await res.json();
        const found = (json.data || []).find((it: any) => it.id === keluargaId);
        if (!found) throw new Error('Data tidak ditemukan');
        setForm({
          nama: found.nama,
          tempatLahir: found.tempatLahir,
          agama: found.agama,
          jenisKelamin: found.jenisKelamin,
          nik: found.nik,
          pendidikan: found.pendidikan,
          hubunganKeluarga: found.hubunganKeluarga,
          tunjanganBeras: found.tunjanganBeras,
          tunjanganKeluarga: found.tunjanganKeluarga,
          potonganAsuransi: found.potonganAsuransi,
          tanggunganPajak: found.tanggunganPajak,
        });
      } catch (e: any) {
        toast.error(e.message || 'Gagal memuat data');
        router.push(`/users/userinfo/${userinfoId}`);
      }
    })();
  }, [keluargaId, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // 2) Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/keluarga/${keluargaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, ...form }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menyimpan perubahan');
      }
      toast.success('Perubahan berhasil disimpan');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Edit Anggota Keluarga">
      <UserBreadcrumb page="Edit Anggota Keluarga" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Edit Anggota Keluarga</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ['Nama', 'nama'],
                ['Tempat Lahir', 'tempatLahir'],
                ['Agama', 'agama'],
                ['NIK', 'nik'],
                ['Pendidikan', 'pendidikan'],
                ['Hubungan Keluarga', 'hubunganKeluarga'],
                ['Tunjangan Beras', 'tunjanganBeras'],
                ['Tunjangan Keluarga', 'tunjanganKeluarga'],
                ['Potongan Asuransi', 'potonganAsuransi'],
                ['Tanggungan Pajak', 'tanggunganPajak'],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <Input name={key} value={(form as any)[key]} onChange={handleChange} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                <select
                  name="jenisKelamin"
                  value={form.jenisKelamin}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1"
                >
                  <option value="">Pilih…</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Menyimpan…' : 'Simpan'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
