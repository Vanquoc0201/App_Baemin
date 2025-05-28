import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#00c7ae] text-white text-sm ">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Slogan */}
        <div>
          <div className="flex items-center mb-3">
            <img
              src="/logo.jpg"
              alt="Baemin"
              className="w-10 h-10 rounded-full mr-2 border border-white"
            />
            <span className="font-bold text-xl">Baemin</span>
          </div>
          <p className="text-white/90 leading-relaxed">
            Giao đồ ăn nhanh chóng, tiện lợi và an toàn đến mọi nhà.
          </p>
        </div>

        {/* Link menu */}
        <div>
          <h4 className="font-semibold text-white mb-3">Liên kết</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:underline hover:text-white/90"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline hover:text-white/90"
              >
                Liên hệ
              </Link>
            </li>
            <li>
              <Link
                href="/policy"
                className="hover:underline hover:text-white/90"
              >
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:underline hover:text-white/90"
              >
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-white mb-3">Hỗ trợ</h4>
          <p className="text-white/90">📧 support@baemin.vn</p>
          <p className="text-white/90">📞 1900 1234</p>
          <p className="text-white/90">⏰ Thứ 2 - CN: 8h00 - 22h00</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 text-center py-4 text-xs text-white/80">
        © {new Date().getFullYear()} Baemin Clone. All rights reserved.
      </div>
    </footer>
  );
}
