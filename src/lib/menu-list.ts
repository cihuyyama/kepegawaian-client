import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Building2
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, role: string): Group[] {
  const dashboard: Group = {
    groupLabel: "",
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutGrid,
        submenus: [],
      },
    ],
  };
  const dosen: Group = {
    groupLabel: "",
    menus: [
      {
        href: "/dosen",
        label: "Dosen",
        icon: LayoutGrid,
        submenus: [],
      },
    ],
  };

  const admin: Group = {
    groupLabel: "Admin",
    menus: [
      {
        href: "/users",
        label: "Data Pegawai",
        icon: Users,
      },
      {
        href: "/unit-kerja",
        label: "Unit Kerja",
        icon: Building2,
      },

    ],
  };

  switch (role) {
    case "admin":
      return [ admin]; // ⛔ Dashboard TIDAK dikembalikan untuk admin
    case "dosen":
      return [dashboard]; // ✅ hanya dosen yang melihat Dashboard\
    case "kaprodi":
      return [dashboard, dosen]; // ✅ Kaprodi melihat Dashboard dan Dosen
    default:
      return [];
  }
}
