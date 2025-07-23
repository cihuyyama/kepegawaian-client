'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { BASE_URL } from "@/constant/BaseURL";
import { UserForm } from "@/components/users/user-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { UserBreadcrumb } from "@/components/users/user-breadcrumb";

export default function EditUserPage() {
  const router = useRouter();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    prodi: "",
    role: "dosen",
    // unitKerjaId: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        const user = data.data;

        setFormData({
          name: user.username,
          email: user.email,
          password: "",
          prodi: user.prodi || "",
          role: user.role || "dosen",
          // unitKerjaId: user.unitKerjaId || "",
        });
      } catch (err) {
        toast.error("Gagal memuat data user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async (values: typeof formData) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: values.name,
          email: values.email,
          password: values.password || undefined,
          role: values.role,
          // unitKerjaId: values.unitKerjaId,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Gagal update user");
      }

      toast.success("User berhasil diperbarui");
      router.push("/users");
    } catch (err: any) {
      toast.error(err.message || "Gagal update user");
    }
  };

  return (
    <ContentLayout title="Edit User">
      <UserBreadcrumb page="Edit" />
      <div className="mt-6 max-w-xl center mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
          </CardHeader>
          <CardContent>
            {!loading ? (
              <UserForm
                initialValues={formData}
                onSubmit={handleUpdate}
                loading={loading}
                cancelHref="/users"
              />
            ) : (
              <p>Loading...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
