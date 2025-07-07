'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Ganti sesuai path sebenarnya
import { BASE_URL } from '@/constant/BaseURL';

type User = {
  username: string;
  role: string;
};

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/access-token`, {
          credentials: 'include'
        });

        if (!res.ok) throw new Error('Unauthorized');

        const data = await res.json();
        setUser({
          username: data.data.username,
          role: data.data.role
        });
      } catch (err) {
        console.error('Gagal mengambil data user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex items-center space-x-4 justify-end w-full">
      {loading ? (
        <Skeleton className="h-5 w-40" />
      ) : user ? (
        <>
          <span className="text-sm font-medium text-gray-800">
            {user.username} | {user.role}
          </span>
        </>
      ) : (
        <span className="text-sm text-muted-foreground">Tidak ada data user</span>
      )}
    </div>
  );
}
