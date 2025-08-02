'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type PenempatanFormData = {
  userId: string;
  unitKerja: string;
  nomorSK: string;
  tanggalSK: string;  // 'YYYY-MM-DD'
  tmt: string;        // 'YYYY-MM-DD'
  file?: File | null;
};

type Props = {
  initialData?: Partial<PenempatanFormData>;
  onSubmit: (data: PenempatanFormData) => void | Promise<void>;
  cancelHref?: string;
  loading?: boolean;
};

export function PenempatanForm({
  initialData,
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  const [form, setForm] = useState<PenempatanFormData>({
    userId: initialData?.userId || '',
    unitKerja: initialData?.unitKerja || '',
    nomorSK: initialData?.nomorSK || '',
    tanggalSK: initialData?.tanggalSK || '',
    tmt: initialData?.tmt || '',
    file: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm(prev => ({
        ...prev,
        ...initialData,
        file: null, // jangan auto isi file saat edit
      }));
    }
  }, [initialData]);

  const update = (k: keyof PenempatanFormData, v: string | File | null) => {
    setForm(p => ({ ...p, [k]: v as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* userId hidden (atau bisa readonly) */}
      <input type="hidden" value={form.userId} />

      <div>
        <label className="block text-sm font-medium mb-1">Unit Kerja</label>
        <Input
          value={form.unitKerja}
          onChange={e => update('unitKerja', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nomor SK</label>
        <Input
          value={form.nomorSK}
          onChange={e => update('nomorSK', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal SK</label>
          <Input
            type="date"
            value={form.tanggalSK}
            onChange={e => update('tanggalSK', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">TMT</label>
          <Input
            type="date"
            value={form.tmt}
            onChange={e => update('tmt', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dokumen SK</label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={e => update('file', e.target.files?.[0] ?? null)}
        />
        {/* Saat edit: file opsional, biarkan kosong jika tidak mengganti */}
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
