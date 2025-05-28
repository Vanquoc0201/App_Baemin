"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useSearchFood } from "@/hooks/food/useSearchFood";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, email, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?foodName=${encodeURIComponent(searchTerm.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#00c7ae] text-white z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto rounded" />
          <span className="font-bold text-lg">BAEMIN</span>
        </Link>

        {/* Search bar (desktop) */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex flex-1 mx-6 max-w-md"
        >
          <input
            type="text"
            placeholder="Tìm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-1 rounded-l-full text-black bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-[#00c7ae] px-4 py-1 rounded-r-full hover:bg-gray-100 transition"
          >
            Tìm
          </button>
        </form>

        {/* Auth + Cart (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-[#00c7ae] text-xs rounded-full px-1">
              0
            </span>
          </Link>

          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    email
                  )}&background=ffffff&color=00c7ae`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <span className="font-semibold">{email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-[#00c7ae] px-4 py-1 rounded-full hover:bg-gray-100 transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-[#00c7ae] px-4 py-1 rounded-full hover:bg-gray-100 transition"
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup"
                className="bg-white text-[#00c7ae] px-4 py-1 rounded-full hover:bg-gray-100 transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white text-[#00c7ae] px-4 py-4 space-y-4 shadow">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Tìm món ăn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-1 text-black border rounded-l-md"
            />
            <button
              type="submit"
              className="bg-[#00c7ae] text-white px-4 py-1 rounded-r-md"
            >
              Tìm
            </button>
          </form>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            <span>Giỏ hàng</span>
            <span className="ml-auto text-sm bg-[#00c7ae] text-white px-2 py-0.5 rounded-full">
              0
            </span>
          </Link>

          <hr className="border-[#00c7ae]/20" />
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    email
                  )}&background=00c7ae&color=ffffff`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{email}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full bg-red-500 text-white py-2 rounded-md mt-2 hover:bg-red-600 transition"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-[#00c7ae] text-white py-2 rounded-md"
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-[#00c7ae] text-white py-2 rounded-md"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
