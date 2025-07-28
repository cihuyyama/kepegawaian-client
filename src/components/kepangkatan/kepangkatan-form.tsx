'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
  onSubmit: (data: {
    nama: string;
    NomorSK: string;
    TanggalSK: string;
    TMT: string;
    TanggalAkhirKontrak: string;
    JenisSK: string;
    GajiPokok: string;
    fileSK: File | null;
  }) => void;
  cancelHref?: string;
  loading?: boolean;
};

export function KepangkatanForm({
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  const [form, setForm] = useState({
    nama: '',
    NomorSK: '',
    TanggalSK: '',
    TMT: '',
    TanggalAkhirKontrak: '',
    JenisSK: '',
    GajiPokok: '',
    fileSK: null as File | null,
  });

  const update = (
    key: keyof typeof form,
    val: string | File | null
  ) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Kepangkatan</label>
        <Input
          value={form.nama}
          onChange={(e) => update('nama', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nomor SK</label>
        <Input
          value={form.NomorSK}
          onChange={(e) => update('NomorSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tanggal SK</label>
        <Input
          type="date"
          value={form.TanggalSK}
          onChange={(e) => update('TanggalSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">TMT</label>
        <Input
          type="date"
          value={form.TMT}
          onChange={(e) => update('TMT', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Tanggal Akhir Kontrak
        </label>
        <Input
          type="date"
          value={form.TanggalAkhirKontrak}
          onChange={(e) =>
            update('TanggalAkhirKontrak', e.target.value)
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jenis SK</label>
        <Input
          value={form.JenisSK}
          onChange={(e) => update('JenisSK', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gaji Pokok</label>
        <Input
          type="number"
          value={form.GajiPokok}
          onChange={(e) => update('GajiPokok', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dokumen SK</label>
        <Input
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
