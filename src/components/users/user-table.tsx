'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { BASE_URL } from "@/constant/BaseURL";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type RawUser = {
  id: string;
  username: string;
  email: string;
};

type RawUserInfo = {
  id: string;        // userinfoId
  userId: string;
};

type User = {
  id: string;         // userId
  name: string;
  email: string;
  userinfoId?: string; // optional
};

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const [usersRes, userinfosRes] = await Promise.all([
        axios.get(`${BASE_URL}/users`, { withCredentials: true }),
        axios.get(`${BASE_URL}/userinfo`, { withCredentials: true }),
      ]);

      const rawUsers: RawUser[] = usersRes.data?.data || [];
      const rawUserInfos: RawUserInfo[] = userinfosRes.data?.data || [];

      // Buat map dari userId → userinfoId
      const userinfoMap = new Map<string, string>();
      rawUserInfos.forEach(info => {
        userinfoMap.set(info.userId, info.id);
      });

      // Gabungkan user dengan userinfoId
      const mappedUsers: User[] = rawUsers.map((user) => ({
        id: user.id,
        name: user.username,
        email: user.email,
        userinfoId: userinfoMap.get(user.id),
      }));

      setUsers(mappedUsers);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    await toast.promise(
      axios.delete(`${BASE_URL}/users/${userId}`, {
        withCredentials: true,
      }).then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      }),
      {
        loading: "Menghapus user...",
        success: "User berhasil dihapus.",
        error: "Gagal menghapus user.",
      }
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center">Loading data...</p>;
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-lg font-medium">User List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
              <Input placeholder="Search users..." className="sm:w-[200px]" />
              <Link href="/users/add">
                <Button variant="success">Tambah User</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/users/edit/${user.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>

                      <Link href={`/users/userinfo/${user.userinfoId ?? ""}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!user.userinfoId}
                        >
                          Biodata
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini tidak bisa dibatalkan. Data user akan hilang secara permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleDelete(user.id)}
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
