'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import type { AnggotaKeluargaRow } from '../types';

export function DashboardAnggotaKeluargaTable({ data }: { data: AnggotaKeluargaRow[] }) {
  return (
    <Table className="table-auto border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Nama</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tempat Lahir</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Agama</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Jenis Kelamin</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">NIK Kependudukan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Pendidikan</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Hubungan Keluarga</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tunjangan Beras</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tunjangan Keluarga</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Potongan Asuransi</TableHead>
          <TableHead className="border px-4 py-2 text-center bg-gray-100 text-gray-800">Tanggungan Pajak</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={row.nik ?? idx}>
            <TableCell className="border px-4">{row.nama}</TableCell>
            <TableCell className="border px-4">{row.tempatLahir}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.agama}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.jenisKelamin}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.nik}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.pendidikan}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.hubunganKeluarga}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tunjanganBeras}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tunjanganKeluarga}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.potonganAsuransi}</TableCell>
            <TableCell className="border px-4 py-2 text-center">{row.tanggunganPajak}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
