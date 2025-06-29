'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { AbsensiRow } from '../types';

export function DashboardAbsensiTable({ data }: { data: AbsensiRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Masuk</TableHead>
          <TableHead>Pulang</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.tanggal}>
            <TableCell>{row.tanggal}</TableCell>
            <TableCell>{row.masuk}</TableCell>
            <TableCell>{row.pulang}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
