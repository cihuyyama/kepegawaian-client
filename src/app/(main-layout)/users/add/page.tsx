'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserBreadcrumb } from "@/components/users/user-breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserForm } from "@/components/users/user-form";
import { toast } from "sonner";
import { BASE_URL } from "@/constant/BaseURL";

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: {
    name: string;
    email: string;
    prodi: string;
    password: string;
    role: string;
  }) => {
    try {
      setLoading(true);

      const payload = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role, // "admin" | "dosen" | "kaprodi"
        // userinfo & unitKerjaId tidak dikirim karena opsional
      };

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Gagal menyimpan data");
      }

      toast.success("User berhasil ditambahkan");
      router.push("/users");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentLayout title="Tambah User">
      <UserBreadcrumb page="Tambah" />
      <div className="mt-6 max-w-xl center mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah User</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm onSubmit={handleCreate} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
