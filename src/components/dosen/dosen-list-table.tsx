'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Pegawai } from '@/types';
import { useMemo, useState } from 'react';

type SortKey = keyof Pick<
  Pegawai,
  'nip' | 'nama' | 'jabatanFungsional' | 'emailUniversitas' | 'noHandphone'
>;

export function DosenListTable({
  data,
  makeId = (nip: string) => nip, // default: pakai nip as-is
}: {
  data: Pegawai[];
  makeId?: (nip: string) => string;
}) {
  const [sortKey, setSortKey] = useState<SortKey>('nama');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const sorted = useMemo(() => {
    const copy = [...data];
    copy.sort((a, b) => {
      const vA = (a[sortKey] ?? '').toString().toLowerCase();
      const vB = (b[sortKey] ?? '').toString().toLowerCase();
      if (vA < vB) return sortAsc ? -1 : 1;
      if (vA > vB) return sortAsc ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortAsc]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <Th label="Foto" />
              <Th label="NIP" sortKey="nip" onSort={handleSort} active={sortKey === 'nip'} asc={sortAsc} />
              <Th label="Nama" sortKey="nama" onSort={handleSort} active={sortKey === 'nama'} asc={sortAsc} />
              <Th label="Jab. Fungsional" sortKey="jabatanFungsional" onSort={handleSort} active={sortKey === 'jabatanFungsional'} asc={sortAsc} />
              <Th label="Email Univ." sortKey="emailUniversitas" onSort={handleSort} active={sortKey === 'emailUniversitas'} asc={sortAsc} />
              <Th label="No. HP" sortKey="noHandphone" onSort={handleSort} active={sortKey === 'noHandphone'} asc={sortAsc} />
              <th className="py-2 px-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
            {paged.map((d) => (
              <tr key={d.nip} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">
                  <div className="w-10 h-14 relative rounded overflow-hidden border">
                    <img
                      src={
                        d.imgUrl
                          ? `${process.env.NEXT_PUBLIC_DOMAIN}/${d.imgUrl}`
                          : '/img/Default-Icon.jpg'
                      }
                      alt="Foto Pegawai"
                      className="object-cover w-full h-full rounded-md border"
                    />
                  </div>
                </td>
                <td className="py-2 px-2">{d.nip}</td>
                <td className="py-2 px-2">
                  {`${d.gelarDepan ?? ''} ${d.nama} ${d.gelarBelakang ?? ''}`.trim()}
                </td>
                <td className="py-2 px-2">{d.jabatanFungsional ?? '-'}</td>
                <td className="py-2 px-2">{d.emailUniversitas}</td>
                <td className="py-2 px-2">{d.noHandphone}</td>
                <td className="py-2 px-2">
                  <Link href={`/dosen/${encodeURIComponent(makeId(d.nip))}`}>
                    <Button size="sm" variant="outline">
                      Lihat Detail
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-xs">
            Page {page} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}

function Th({
  label,
  sortKey,
  onSort,
  active,
  asc,
}: {
  label: string;
  sortKey?: SortKey;
  onSort?: (k: SortKey) => void;
  active?: boolean;
  asc?: boolean;
}) {
  if (!sortKey || !onSort) return <th className="py-2 px-2">{label}</th>;
  return (
    <th
      className="py-2 px-2 cursor-pointer select-none"
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className={`w-3 h-3 ${active ? 'text-blue-500' : 'text-gray-400'}`} />
        {active && (asc ? '▲' : '▼')}
      </span>
    </th>
  );
}
