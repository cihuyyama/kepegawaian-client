'use client';

import { useEffect, useState, useMemo } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type RawUser = { id: string; username: string; email: string };
type RawUserInfo = { id: string; userId: string };

type User = {
  id: string;
  name: string;
  email: string;
  userinfoId?: string;
};

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSizeOption, setPageSizeOption] = useState<"5" | "10" | "50" | "all">("5");

  const fetchUsers = async () => {
    try {
      const meRes = await axios.get(`${BASE_URL}/users/access-token`, { withCredentials: true });
      setCurrentUserId(meRes.data.data.id);
      const [usersRes, infosRes] = await Promise.all([
        axios.get(`${BASE_URL}/users`, { withCredentials: true }),
        axios.get(`${BASE_URL}/userinfo`, { withCredentials: true }),
      ]);
      const raw: RawUser[] = usersRes.data.data || [];
      const infos: RawUserInfo[] = infosRes.data.data || [];
      const mapInfo = new Map(infos.map(i => [i.userId, i.id]));
      setUsers(raw.map(u => ({
        id: u.id,
        name: u.username,
        email: u.email,
        userinfoId: mapInfo.get(u.id),
      })));
    } catch (e) {
      console.error(e);
      toast.error("Gagal mengambil data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return users;
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  // setiap kali filter atau pageSize berubah, reset ke halaman 1
  useEffect(() => { setPage(1); }, [filtered, pageSizeOption]);

  const pageSizeNumber = pageSizeOption === "all"
    ? filtered.length || 1
    : parseInt(pageSizeOption, 10);

  const totalPages = pageSizeOption === "all"
    ? 1
    : Math.max(1, Math.ceil(filtered.length / pageSizeNumber));

  const paginated = useMemo(() => {
    if (pageSizeOption === "all") return filtered;
    const start = (page - 1) * pageSizeNumber;
    return filtered.slice(start, start + pageSizeNumber);
  }, [filtered, page, pageSizeOption, pageSizeNumber]);

  const handleDelete = async (id: string) => {
    await toast.promise(
      axios.delete(`${BASE_URL}/users/${id}`, { withCredentials: true })
        .then(() => setUsers(u => u.filter(x => x.id !== id))),
      {
        loading: "Menghapus user...",
        success: "User berhasil dihapus.",
        error: "Gagal menghapus user.",
      }
    );
  };

  if (loading) {
    return <p className="text-center">Loading data...</p>;
  }

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-lg font-medium">Pegawai List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:items-center">
              <Input
                placeholder="Search users..."
                className="sm:w-[200px]"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Link href="/users/add">
                <Button variant="success">Tambah Pegawai</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map(user => {
                  const isSelf = user.id === currentUserId;
                  return (
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
                            Data
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isSelf}
                              title={isSelf ? "Tidak bisa menghapus akun sendiri" : undefined}
                              onClick={e => e.stopPropagation()}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent onClick={e => e.stopPropagation()}>
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
                                disabled={isSelf}
                                onClick={() => !isSelf && handleDelete(user.id)}
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* pagination + page-size selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Show:</span>
              <Select
                value={pageSizeOption}
                onValueChange={val => setPageSizeOption(val as any)}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={pageSizeOption === "all" ? "All" : pageSizeOption} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || pageSizeOption === "all"}
              >
                <ChevronLeft className=" w-4 h-4" />
              </Button>
              <span className="text-sm">
                Halaman {page} dari {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || pageSizeOption === "all"}
              >
                <ChevronRight className=" w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
