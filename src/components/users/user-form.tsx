// src/components/users/user-form.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL } from "@/constant/BaseURL";

// ✅ SATUKAN KONTRAK DATA YANG DIKIRIM FORM
export type SubmitData = {
  name: string;
  email: string;
  password: string;
  role: string;
  prodi: string;        // <- ID prodi (unitKerjaId) yang dipilih
};

type UserFormProps = {
  // ✅ IZINKAN Promise
  onSubmit: (data: SubmitData) => void | Promise<void>;
  initialValues?: SubmitData;
  cancelHref?: string;
  loading?: boolean;
};

type UnitKerja = { id: string; name: string };

export function UserForm({
  onSubmit,
  initialValues = {
    name: "",
    email: "",
    password: "",
    role: "admin",
    prodi: "",           // <- default kosong
  },
  cancelHref = "/users",
  loading = false,
}: UserFormProps) {
  const [form, setForm] = useState<SubmitData>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [unitKerjaList, setUnitKerjaList] = useState<UnitKerja[]>([]);
  const [unitsLoading, setUnitsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((p) => !p);

  useEffect(() => {
    (async () => {
      setUnitsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/unit-kerja/`, { credentials: "include" });
        const json = await res.json();
        const items: any[] = json?.data || [];
        const mapped: UnitKerja[] = items.map((it) => ({
          id: it.id,
          name: it.name ?? it.nama ?? it.namaUnitKerja ?? it.title ?? "Unit Kerja",
        }));
        setUnitKerjaList(mapped);
      } catch {
        setUnitKerjaList([]);
      } finally {
        setUnitsLoading(false);
      }
    })();
  }, []);

  const isValid = useMemo(() => {
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.password.trim() !== "" &&
      form.role.trim() !== "" &&
      form.prodi.trim() !== ""
    );
  }, [form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);     // ✅ sekarang mengirim { ... , prodi }
      }}
      className="space-y-4"
    >
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium mb-1">Nama</label>
        <Input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Masukkan nama lengkap"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <Select
          value={form.role}
          onValueChange={(value) => setForm({ ...form, role: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="kaprodi">Kaprodi</SelectItem>
            <SelectItem value="dosen">Dosen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Prodi */}
      <div>
        <label className="block text-sm font-medium mb-1">Prodi</label>
        <Select
          value={form.prodi}
          onValueChange={(value) => setForm({ ...form, prodi: value })}
          disabled={unitsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={unitsLoading ? "Memuat..." : "Pilih prodi"} />
          </SelectTrigger>
          <SelectContent>
            {unitKerjaList.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Masukkan email"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Masukkan password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary transition-all"
            aria-label="Toggle password visibility"
          >
            {/* icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.06.088-.125.185-.2.29-.332.474-.821 1.106-1.456 1.743-1.29 1.289-3.05 2.457-5.172 2.457-2.121 0-3.882-1.168-5.171-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Link href={cancelHref}>
          <Button variant="outline" type="button">Batal</Button>
        </Link>
        <Button type="submit" disabled={loading || !isValid}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
