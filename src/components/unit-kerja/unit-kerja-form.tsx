// src/components/unit-kerja/unit-kerja-form.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { X } from 'lucide-react';
import { BASE_URL } from '@/constant/BaseURL';

type UnitKerjaFormProps = {
  onSubmit: (data: { name: string; kepalaUnitKerjaId: string | null; anggota: string[] }) => void;
  initialValues?: { name: string; kepalaUnitKerjaId: string | null; anggota: string[] };
  cancelHref?: string;
  loading?: boolean;
  currentUnitId?: string;
};

type User = { id: string; username: string; email: string; role: string | null };
type UnitKerja = { id: string; kepalaUnitKerjaId: string | null };

const NONE = '__none__';
const DEFAULT_VALUES = { name: '', kepalaUnitKerjaId: null, anggota: [] as string[] };

export function UnitKerjaForm({
  onSubmit,
  initialValues,
  cancelHref = '/unit-kerja',
  loading = false,
  currentUnitId,
}: UnitKerjaFormProps) {
  const [form, setForm] = useState(() => initialValues ?? DEFAULT_VALUES);
  const [users, setUsers] = useState<User[]>([]);
  const [units, setUnits] = useState<UnitKerja[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [openAnggota, setOpenAnggota] = useState(false);

  // Sinkron state saat mode edit
  useEffect(() => {
    if (initialValues) setForm(initialValues);
  }, [initialValues]);

  useEffect(() => {
    (async () => {
      try {
        setLoadingUsers(true);

        // Ganti: /users -> /userinfo
        const [resUserinfo, resUnits] = await Promise.all([
          fetch(`${BASE_URL}/userinfo`, { credentials: 'include' }),
          fetch(`${BASE_URL}/unit-kerja`, { credentials: 'include' }),
        ]);

        const jsonUserinfo = await resUserinfo.json();
        const jsonUnits = await resUnits.json();

        // Normalisasi: kita butuh id (user.id), username, email, role
        const fromUserinfo: User[] = (jsonUserinfo?.data || [])
          .map((ui: any) => {
            const u = ui?.user;
            if (!u) return null;
            return {
              id: String(u.id),
              username: u.username ?? '(tanpa nama)',
              email: u.email ?? '-',
              role: (u.role ?? null) as string | null,
            };
          })
          .filter(Boolean);

        setUsers(fromUserinfo as User[]);
        setUnits(jsonUnits?.data || []);
      } catch (e) {
        console.error('Gagal mengambil data:', e);
      } finally {
        setLoadingUsers(false);
      }
    })();
  }, []);

  // Kepala: hanya KAPRODI
  const kaprodiUsers = useMemo(
    () => users.filter((u) => (u.role ?? '').toLowerCase() === 'kaprodi'),
    [users]
  );

  // Anggota: hanya DOSEN
  const dosenUsers = useMemo(
    () => users.filter((u) => (u.role ?? '').toLowerCase() === 'dosen'),
    [users]
  );

  // Toggle anggota
  const toggleAnggota = (id: string) =>
    setForm((prev) => ({
      ...prev,
      anggota: prev.anggota.includes(id)
        ? prev.anggota.filter((x) => x !== id)
        : [...prev.anggota, id],
    }));

  const clearAnggota = () => setForm((p) => ({ ...p, anggota: [] }));

  // Cegah kepala ganda di unit lain (tetap periksa id user, bukan userinfo)
  const takenHeads = useMemo(
    () =>
      new Set(
        units
          .filter((u) => u.id !== currentUnitId)
          .map((u) => u.kepalaUnitKerjaId)
          .filter(Boolean) as string[]
      ),
    [units, currentUnitId]
  );

  const isDisabledHead = (id: string) => takenHeads.has(id) && id !== form.kepalaUnitKerjaId;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Penting: kepalaUnitKerjaId & anggota yang dikirim adalah user.id
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nama Unit Kerja *</label>
        <Input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Masukkan nama unit kerja"
        />
      </div>

      {/* Kepala: hanya kaprodi */}
      <div>
        <label className="block text-sm font-medium mb-1">Kepala Unit Kerja (opsional)</label>
        <Select
          value={form.kepalaUnitKerjaId ?? NONE}
          onValueChange={(v) => setForm({ ...form, kepalaUnitKerjaId: v === NONE ? null : v })}
        >
          <SelectTrigger className="w-full" disabled={loadingUsers}>
            <SelectValue placeholder={loadingUsers ? 'Memuat...' : 'Pilih kaprodi'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>(Kosongkan)</SelectItem>
            {kaprodiUsers.map((u) => (
              <SelectItem key={u.id} value={u.id} disabled={isDisabledHead(u.id)}>
                {u.username} — {u.email}
                {isDisabledHead(u.id) && ' (sudah kepala di unit lain)'}
              </SelectItem>
            ))}
            {!kaprodiUsers.length && (
              <div className="px-3 py-2 text-xs text-gray-500">Tidak ada user ber-role kaprodi.</div>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Anggota: hanya dosen */}
      <div>
        <label className="block text-sm font-medium mb-1">Anggota (opsional)</label>
        <Popover open={openAnggota} onOpenChange={setOpenAnggota}>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" className="justify-between w-full" disabled={loadingUsers}>
              {form.anggota.length > 0 ? `${form.anggota.length} dipilih` : loadingUsers ? 'Memuat...' : 'Pilih anggota (dosen)'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[320px]" align="start">
            <div className="flex items-center justify-between px-2 py-1 border-b">
              <span className="text-xs text-gray-500">{form.anggota.length} dipilih</span>
              {form.anggota.length > 0 && (
                <Button variant="ghost" size="icon" onClick={clearAnggota} title="Kosongkan">
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
            <ScrollArea className="h-72">
              <div className="p-2 space-y-1">
                {dosenUsers.map((u) => {
                  const checked = form.anggota.includes(u.id);
                  return (
                    <label
                      key={u.id}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleAnggota(u.id)} />
                      <div className="flex flex-col">
                        <span className="text-sm">{u.username}</span>
                        <span className="text-xs text-gray-500">{u.email}</span>
                      </div>
                    </label>
                  );
                })}
                {!dosenUsers.length && (
                  <div className="px-3 py-2 text-xs text-gray-500">Tidak ada user ber-role dosen.</div>
                )}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
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
