// src/components/inpasing/inpasing-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type InpasingFormData = {
  kepangkatan: string;
  nomorSK: string;
  tanggalSK: string;   // 'YYYY-MM-DD'
  tmt: string;         // 'YYYY-MM-DD'
  fileSK: File | null;
};

type Props = {
  initialData?: Partial<InpasingFormData>;
  onSubmit: (data: InpasingFormData) => void;
  cancelHref?: string;
  loading?: boolean;
};

export function InpasingForm({
  initialData,
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  const [form, setForm] = useState<InpasingFormData>({
    kepangkatan: initialData?.kepangkatan || '',
    nomorSK: initialData?.nomorSK || '',
    tanggalSK: initialData?.tanggalSK || '',
    tmt: initialData?.tmt || '',
    fileSK: null,
  });

  // Sync saat edit
  useEffect(() => {
    if (initialData) {
      setForm(f => ({
        ...f,
        ...initialData,
        fileSK: null,
      }));
    }
  }, [initialData]);

  const update = (
    key: keyof InpasingFormData,
    val: string | File | null
  ) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Kepangkatan</label>
        <Input
          name="kepangkatan"
          value={form.kepangkatan}
          onChange={e => update('kepangkatan', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nomor SK</label>
        <Input
          name="nomorSK"
          value={form.nomorSK}
          onChange={e => update('nomorSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tanggal SK</label>
        <Input
          name="tanggalSK"
          type="date"
          value={form.tanggalSK}
          onChange={e => update('tanggalSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">TMT</label>
        <Input
          name="tmt"
          type="date"
          value={form.tmt}
          onChange={e => update('tmt', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dokumen SK</label>
        <Input
          name="fileSK"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => update('fileSK', e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Link href={cancelHref}>
          <Button variant="outline" type="button">
            Batal
          </Button>
        </Link>
        <Button type="submit" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
