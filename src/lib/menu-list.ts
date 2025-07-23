import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
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
        label: "Users",
        icon: Users,
      },
    ],
  };

  switch (role) {
    case "admin":
      return [dashboard,dosen, admin]; // ⛔ Dashboard TIDAK dikembalikan untuk admin
    case "dosen":
      return [dashboard]; // ✅ hanya dosen yang melihat Dashboard\
    case "kaprodi":
      return [dashboard, dosen]; // ✅ Kaprodi melihat Dashboard dan Dosen
    default:
      return [];
  }
}
