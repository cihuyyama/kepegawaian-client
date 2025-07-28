// src/app/(main-layout)/users/userinfo/[userinfoId]/keluarga/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/constant/BaseURL';

export default function AddAnggotaKeluargaPage() {
  const router = useRouter();
  const { userinfoId } = useParams<{ userinfoId: string }>();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId')!;

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
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/keluarga/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId, ...form }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Gagal menambah anggota keluarga');
      }
      toast.success('Anggota keluarga berhasil ditambahkan');
      router.push(`/users/userinfo/${userinfoId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah Anggota Keluarga">
      <UserBreadcrumb page="Tambah Anggota Keluarga" />
      <div className="mt-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Anggota Keluarga</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Kolom input teks */}
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
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <Input
                    name={key}
                    value={(form as any)[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              {/* Dropdown Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jenis Kelamin
                </label>
                <select
                  name="jenisKelamin"
                  value={form.jenisKelamin}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-2 py-1"
                >
                  <option value="">Pilih…</option>
                  <option value="L">Laki‑Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              {/* Tombol Simpan */}
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
