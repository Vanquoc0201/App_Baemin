"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { authService } from "@/services/authService";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authService.login({ email, password });

      const token = res.data.data.accessToken;
      if (token) {
        login(token, email);
        router.push("/");
      } else {
        setError("Đăng nhập thất bại. Không nhận được token.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00c7be]">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-[#00c7be] mb-6">
          Chào mừng quay lại!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c7be]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c7be]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#00c7be] hover:bg-[#00b3ab] text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-4">
            Bạn chưa có tài khoản?{" "}
            <Link href="/signup" className="text-cyan-400 hover:underline">
                Đăng ký
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
