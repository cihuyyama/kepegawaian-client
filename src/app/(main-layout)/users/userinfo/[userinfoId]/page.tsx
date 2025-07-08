'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BASE_URL } from '@/constant/BaseURL';
import { toast } from 'sonner';
import Image from 'next/image';
import { Upload, Pencil } from 'lucide-react';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserBreadcrumb } from '@/components/users/user-breadcrumb';

export default function EditUserinfoPage() {
  const { userinfoId } = useParams();
  const [formData, setFormData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [imageVersion, setImageVersion] = useState<number>(Date.now());

  // Ambil userinfo
  useEffect(() => {
    const fetchUserinfo = async () => {
      try {
        const res = await fetch(`${BASE_URL}/userinfo/${userinfoId}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setFormData(data.data);
      } catch (err) {
        toast.error('Gagal memuat data userinfo');
      } finally {
        setLoading(false);
      }
    };

    fetchUserinfo();
  }, [userinfoId]);

  // Ambil data user berdasarkan userId dari userinfo
  useEffect(() => {
    if (!formData?.userId) return;
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${formData.userId}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        toast.error('Gagal memuat data user');
      }
    };

    fetchUser();
  }, [formData?.userId]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editField || !formData.userId) return;

    const payload = {
      userId: formData.userId,
      [editField]: formData[editField],
    };

    try {
      const res = await fetch(`${BASE_URL}/userinfo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Gagal menyimpan data');
      toast.success('Perubahan disimpan');
      setEditField(null);
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData?.userId) return;

    const form = new FormData();
    form.append('image', file);

    setPhotoLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${formData.userId}/photo`, {
        method: 'PUT',
        credentials: 'include',
        body: form,
      });

      if (!res.ok) throw new Error('Gagal mengunggah foto');

      toast.success('Foto berhasil diperbarui');

      const userRes = await fetch(`${BASE_URL}/users/${formData.userId}`, {
        credentials: 'include',
      });
      const updatedUser = await userRes.json();
      setUser(updatedUser.data);

      // 🔥 update hanya di sini!
      setImageVersion(Date.now());
    } catch (err: any) {
      toast.error(err.message || 'Upload gagal');
    } finally {
      setPhotoLoading(false);
    }
  };

  const info = [
    { label: 'NIP', field: 'NIP' },
    { label: 'Gelar Depan', field: 'GelarDepan' },
    { label: 'Gelar Belakang', field: 'GelarBelakang' },
    { label: 'Jenis Kelamin', field: 'JenisKelamin' },
    { label: 'Tempat Lahir', field: 'TempatLahir' },
    { label: 'Tanggal Lahir', field: 'TanggalLahir' },
    { label: 'Alamat', field: 'Alamat' },
    { label: 'Phone', field: 'Phone' },
    { label: 'NBM', field: 'NBM' },
    { label: 'NIDN', field: 'NIDN' },
    { label: 'NIDK', field: 'NIDK' },
    { label: 'NUPTK', field: 'NUPTK' },
    { label: 'ID Scholar', field: 'IDScholar' },
    { label: 'ID Scopus', field: 'IDScopus' },
    { label: 'ID Shinta', field: 'IDShinta' },
    { label: 'ID Garuda', field: 'IDGaruda' },
    { label: 'NPWP', field: 'NPWP' },
    { label: 'NIK', field: 'NIK' },
    { label: 'Work Email', field: 'WorkEmail' },
    { label: 'Jabatan Struktural', field: 'JabatanStruktural' },
    { label: 'Jabatan Fungsional', field: 'JabatanFungsional' },
  ];

  const half = Math.ceil(info.length / 2);
  const leftItems = info.slice(0, half);
  const rightItems = info.slice(half);

  const toDisplayDate = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  };

  const toISODate = (value: string) => {
    return new Date(value).toISOString();
  };

  const toDDMMYYYY = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  if (loading || !formData) return <p className="text-center mt-4">Memuat data...</p>;

  return (
    <ContentLayout title="Edit Profil Pegawai">

      <UserBreadcrumb />
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Biodata Pegawai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Foto */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-[150px] h-[200px] rounded-md overflow-hidden border relative group">
                  <img
                    src={
                      user?.imgUrl
                        ? `${process.env.NEXT_PUBLIC_DOMAIN}/${user.imgUrl}?v=${imageVersion}`
                        : '/img/Default-Icon.jpg'
                    }
                    alt="Foto Pegawai"
                    className="object-cover w-full h-full rounded-md border"
                  />

                  <label className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                    {photoLoading ? 'Mengunggah...' : (
                      <>
                        <Upload className="w-4 h-4 mr-1" />
                        Ganti Foto
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Form */}
              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[leftItems, rightItems].map((column, colIndex) => (
                  <div key={colIndex} className="space-y-4">
                    {column.map(({ label, field }) => (
                      <div key={field}>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium">{label}:</span>
                          {editField !== field && (
                            <Pencil
                              className="w-4 h-4 text-blue-500 cursor-pointer"
                              onClick={() => setEditField(field)}
                            />
                          )}
                        </div>
                        {editField === field ? (
                          field === 'TanggalLahir' ? (
                            <input
                              type="date"
                              value={toDisplayDate(formData[field])}
                              onChange={(e) => handleChange(field, toISODate(e.target.value))}
                              onBlur={handleSave}
                              className="border rounded px-2 py-1 w-full text-sm"
                              autoFocus
                            />
                          ) : (
                            <Input
                              value={formData[field] || ''}
                              onChange={(e) => handleChange(field, e.target.value)}
                              onBlur={handleSave}
                              autoFocus
                            />
                          )
                        ) : (
                          <p>
                            {field === 'TanggalLahir'
                              ? toDDMMYYYY(formData[field])
                              : formData[field] || '-'}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
