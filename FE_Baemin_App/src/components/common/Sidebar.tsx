"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, Utensils, Users, Settings } from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
  { name: "Foods", icon: <Utensils size={18} />, path: "/admin/foods" },
  { name: "Users", icon: <Users size={18} />, path: "/admin/users" },
  { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 bg-[#00c7be] text-white flex flex-col shadow-lg">
      <div className="p-6 text-center border-b border-white/20">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-[#00c7be]"
                  : "hover:bg-white/10 hover:pl-5"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
