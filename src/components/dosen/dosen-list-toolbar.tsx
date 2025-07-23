// src/components/dosen/dosen-list-toolbar.tsx
'use client';

import { Input } from '@/components/ui/input';

export function DosenListToolbar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <Input
      placeholder="Cari nama / NIP / Jab. Fungsional / Email..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="w-full md:w-72"
    />
  );
}
