"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { BASE_URL } from "@/constant/BaseURL";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch role dari API saat component mount
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/access-token`, {
          method: "GET",
          credentials: "include", // untuk kirim cookie jika pakai session
        });

        if (!res.ok) {
          throw new Error("Gagal mengambil access token");
        }

        const data = await res.json();
        const userRole = data?.data?.role;

        if (userRole) {
          setRole(userRole);
        } else {
          throw new Error("Role tidak ditemukan");
        }
      } catch (err) {
        console.error("Error saat mengambil role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  // ⛔ Hindari render saat role belum siap
  if (!sidebar || loading || !role) return null;

  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !getOpenState()
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              SIM Kepegawaian
            </h1>
          </Link>
        </Button>
        {/* ✅ Kirim role hasil dari API ke komponen Menu */}
        <Menu isOpen={getOpenState()} role={role} />
      </div>
    </aside>
  );
}
