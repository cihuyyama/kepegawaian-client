'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserBreadcrumb } from "@/components/users/user-breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserForm } from "@/components/users/user-form";

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData: {
    name: string;
    email: string;
    prodi: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const res = await fetch("https://api-kamu.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      router.push("/dashboard/users");
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan");
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
