'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { CutiRow } from '../types';

export function DashboardCutiTable({ data }: { data: CutiRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jenis</TableHead>
          <TableHead>Mulai</TableHead>
          <TableHead>Sampai</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{row.jenis}</TableCell>
            <TableCell>{row.mulai}</TableCell>
            <TableCell>{row.sampai}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
