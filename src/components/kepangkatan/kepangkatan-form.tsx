// src/components/kepangkatan/kepangkatan-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type KepangkatanFormData = {
  nama: string;
  NomorSK: string;
  TanggalSK: string;
  TMT: string;
  TanggalAkhirKontrak: string;
  JenisSK: string;
  GajiPokok: string;
  fileSK: File | null;
};

type Props = {
  /** untuk edit: data awal form */
  initialData?: Partial<KepangkatanFormData>;
  onSubmit: (data: KepangkatanFormData) => void;
  cancelHref?: string;
  loading?: boolean;
};

export function KepangkatanForm({
  initialData,
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  const [form, setForm] = useState<KepangkatanFormData>({
    nama: initialData?.nama || '',
    NomorSK: initialData?.NomorSK || '',
    TanggalSK: initialData?.TanggalSK || '',
    TMT: initialData?.TMT || '',
    TanggalAkhirKontrak: initialData?.TanggalAkhirKontrak || '',
    JenisSK: initialData?.JenisSK || '',
    GajiPokok: initialData?.GajiPokok || '',
    fileSK: null,
  });

  // Sync when editing and initialData arrives/changes
  useEffect(() => {
    if (initialData) {
      setForm(f => ({
        ...f,
        ...initialData,
        fileSK: null, // always reset file input on edit
      }));
    }
  }, [initialData]);

  const update = (
    key: keyof KepangkatanFormData,
    val: string | File | null
  ) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Kepangkatan</label>
        <Input
          name="nama"
          value={form.nama}
          onChange={(e) => update('nama', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nomor SK</label>
        <Input
          name="NomorSK"
          value={form.NomorSK}
          onChange={(e) => update('NomorSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tanggal SK</label>
        <Input
          name="TanggalSK"
          type="date"
          value={form.TanggalSK}
          onChange={(e) => update('TanggalSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">TMT</label>
        <Input
          name="TMT"
          type="date"
          value={form.TMT}
          onChange={(e) => update('TMT', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tanggal Akhir Kontrak</label>
        <Input
          name="TanggalAkhirKontrak"
          type="date"
          value={form.TanggalAkhirKontrak}
          onChange={(e) => update('TanggalAkhirKontrak', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jenis SK</label>
        <Input
          name="JenisSK"
          value={form.JenisSK}
          onChange={(e) => update('JenisSK', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gaji Pokok</label>
        <Input
          name="GajiPokok"
          type="number"
          value={form.GajiPokok}
          onChange={(e) => update('GajiPokok', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dokumen SK</label>
        <Input
          name="fileSK"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => update('fileSK', e.target.files?.[0] ?? null)}
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
