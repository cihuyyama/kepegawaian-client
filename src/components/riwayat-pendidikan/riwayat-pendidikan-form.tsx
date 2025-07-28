'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface RiwayatPendidikanFormData {
  pendidikan: string;
  namaInstitusi: string;
  tahunLulus: string;
}

type Props = {
  initialData?: Partial<RiwayatPendidikanFormData>;
  onSubmit: (data: RiwayatPendidikanFormData) => void;
  cancelHref?: string;
  loading?: boolean;
};

export function RiwayatPendidikanForm({
  initialData,
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  const [form, setForm] = useState<RiwayatPendidikanFormData>({
    pendidikan: '',
    namaInstitusi: '',
    tahunLulus: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(f => ({ ...f, ...initialData }));
    }
  }, [initialData]);

  const update = (key: keyof RiwayatPendidikanFormData, val: string) =>
    setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Pendidikan</label>
        <Input
          name="pendidikan"
          value={form.pendidikan}
          onChange={e => update('pendidikan', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nama Institusi</label>
        <Input
          name="namaInstitusi"
          value={form.namaInstitusi}
          onChange={e => update('namaInstitusi', e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tahun Lulus</label>
        <Input
          name="tahunLulus"
          type="number"
          value={form.tahunLulus}
          onChange={e => update('tahunLulus', e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Link href={cancelHref}>
          <Button variant="outline" type="button">Batal</Button>
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
