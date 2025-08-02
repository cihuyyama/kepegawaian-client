// src/components/kendaraan/kendaraan-form.tsx
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type KendaraanFormData = {
  userId: string;
  namaPemilik: string;
  nomorKendaraan: string;
  merek: string;
  jenis: string;
  file?: File | null;
};

type Props = {
  initialData?: Partial<KendaraanFormData>;
  onSubmit: (data: KendaraanFormData) => void | Promise<void>;
  cancelHref?: string;
  loading?: boolean;
};

export function KendaraanForm({
  initialData,
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  const [form, setForm] = useState<KendaraanFormData>({
    userId: initialData?.userId || '',
    namaPemilik: initialData?.namaPemilik || '',
    nomorKendaraan: initialData?.nomorKendaraan || '',
    merek: initialData?.merek || '',
    jenis: initialData?.jenis || '',
    file: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm(prev => ({ ...prev, ...initialData, file: null }));
    }
  }, [initialData]);

  const update = (k: keyof KendaraanFormData, v: string | File | null) => {
    setForm(p => ({ ...p, [k]: v as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" value={form.userId} />

      <div>
        <label className="block text-sm font-medium mb-1">Nama Pemilik</label>
        <Input
          value={form.namaPemilik}
          onChange={e => update('namaPemilik', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Nomor Kendaraan</label>
          <Input
            value={form.nomorKendaraan}
            onChange={e => update('nomorKendaraan', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Merek</label>
          <Input
            value={form.merek}
            onChange={e => update('merek', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jenis</label>
        <Input
          value={form.jenis}
          onChange={e => update('jenis', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dokumen (STNK/BPKB, dll)</label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={e => update('file', e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Link href={cancelHref}>
          <Button type="button" variant="outline">Batal</Button>
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
