'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { GajiRow } from '../types';

export function DashboardGajiTable({ data }: { data: GajiRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bulan</TableHead>
          <TableHead>Gaji Pokok</TableHead>
          <TableHead>Tunjangan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{row.bulan}</TableCell>
            <TableCell>{row.pokok}</TableCell>
            <TableCell>{row.tunjangan}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
