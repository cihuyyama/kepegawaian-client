'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type JabatanStrukturalFormData = {
  namaJabatan: string;
  nomorSK: string;
  periodeMenjabat: string;      // akan dibentuk dari periodeStart + '-' + periodeEnd
  skPemberhentian: string;
  tmtPemberhentian: string;     // 'YYYY-MM-DD'
  tunjanganTetap: string;
  tunjanganVariabel: string;
  fileSK?: File | null;
};

type Props = {
  initialData?: Partial<JabatanStrukturalFormData>;
  onSubmit: (data: JabatanStrukturalFormData) => void;
  cancelHref?: string;
  loading?: boolean;
};

export function JabatanStrukturalForm({
  initialData,
  onSubmit,
  cancelHref = '#',
  loading = false,
}: Props) {
  // Form fields kecuali periode
  const [form, setForm] = useState<Omit<JabatanStrukturalFormData, 'periodeMenjabat'>>({
    namaJabatan: initialData?.namaJabatan || '',
    nomorSK: initialData?.nomorSK || '',
    skPemberhentian: initialData?.skPemberhentian || '',
    tmtPemberhentian: initialData?.tmtPemberhentian || '',
    tunjanganTetap: initialData?.tunjanganTetap || '',
    tunjanganVariabel: initialData?.tunjanganVariabel || '',
    fileSK: null,
  });

  // Dua tanggal untuk periode: mulai & akhir
  const [periodeStart, setPeriodeStart] = useState<string>('');
  const [periodeEnd, setPeriodeEnd] = useState<string>('');

  // Sync initialData ke state form dan periodeStart/End saat edit
  useEffect(() => {
    if (initialData) {
      setForm(f => ({
        ...f,
        ...initialData,
        fileSK: null,
      }));
      if (initialData.periodeMenjabat) {
        const [start, end] = initialData.periodeMenjabat.split(/\s*[-–]\s*/);
        setPeriodeStart(start);
        setPeriodeEnd(end);
      }
    }
  }, [initialData]);

  // Handler pembaruan field non-periode
  const updateField = (
    key: keyof Omit<JabatanStrukturalFormData, 'periodeMenjabat'>,
    val: string | File | null
  ) => {
    setForm(f => ({
      ...f,
      [key]: val,
    }));
  };

  // Submit form: gabungkan periodeStart dan periodeEnd
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const periode = `${periodeStart}-${periodeEnd}`;
    onSubmit({
      ...form,
      periodeMenjabat: periode,
    } as JabatanStrukturalFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nama Jabatan</label>
        <Input
          value={form.namaJabatan}
          onChange={e => updateField('namaJabatan', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nomor SK</label>
        <Input

          value={form.nomorSK}
          onChange={e => updateField('nomorSK', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Periode Menjabat</label>
        <div className="flex items-center space-x-2">
          <Input
            type="date"
            value={periodeStart}
            onChange={e => setPeriodeStart(e.target.value)}
            required
          />
          <span className="select-none">–</span>
          <Input
            type="date"
            value={periodeEnd}
            onChange={e => setPeriodeEnd(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">SK Pemberhentian</label>
        <Input
          value={form.skPemberhentian}
          onChange={e => updateField('skPemberhentian', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">TMT Pemberhentian</label>
        <Input
          type="date"
          value={form.tmtPemberhentian}
          onChange={e => updateField('tmtPemberhentian', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tunjangan Tetap</label>
        <Input
          type="number"
          value={form.tunjanganTetap}
          onChange={e => updateField('tunjanganTetap', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tunjangan Variabel</label>
        <Input
          type="number"
          value={form.tunjanganVariabel}
          onChange={e => updateField('tunjanganVariabel', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dokumen SK</label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => updateField('fileSK', e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Link href={cancelHref!}>
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
