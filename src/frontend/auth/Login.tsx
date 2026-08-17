import {
  FaEnvelope,
  FaUserLock,
  FaLock,
  FaLeaf,
  FaFacebook,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useSignIn } from "@clerk/react";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn } = useSignIn();

  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginStatus = () => {
    setLogin(true);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn.password({
        identifier: email,
        password: password,
      });
      if (signIn.status === "complete") {
        await signIn.finalize();
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-280 h-auto shadow-2xl rounded-3xl">
        <div className="flex-col justify-center items-center hidden md:flex gap-5">
          {login ? (
            <p className="font-semibold">Welcome back user</p>
          ) : (
            <div className="flex flex-col items-center space-y-7">
              <FaUserLock size={140} className="text-[#75cf4c]" />
              <div className="grid grid-rows-2 justify-items-center">
                <h1 className="text-2xl font-semibold">Welcome</h1>
                <p className="font-medium">Secure access portal</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-evenly p-9">
          <div className="flex flex-col items-center justify-center gap-2 mb-10">
            <div className="rounded-xl shadow-2xl shadow-black p-2 mb-5">
              <FaLeaf size={35} className="text-[#75cf4c]" />
            </div>
            <h1 className="tracking-wider text-2xl font-bold">Leaf Trade</h1>
            <p className="text-sm font-semibold">Sign in to your account</p>
          </div>
          <form
            className="grid grid-rows-2 gap-7 p-3 mb-7 [&_input]:text-sm [&_input]:py-3 [&_label]:text-xs md:[&_label]:text-sm md:[&_label]:font-medium"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Email</label>

              <div className="relative">
                <FaEnvelope
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  className="w-full rounded-3xl p-2.5 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Password</label>

              <div className="relative">
                <FaLock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl p-2.5 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="password"
                />
              </div>
            </div>
            <div className="flex justify-between -mt-3">
              <div className="flex flex-row">
                <input type="checkbox" />
                <span className="text-xs font-medium ml-1">
                  Trust this device
                </span>
              </div>

              <a
                className="text-xs font-medium hover:underline text-blue-700"
                href=""
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="flex flex-col items-center p-3 gap-5">
            <button
              onClick={LoginStatus}
              className="p-2.5 w-full bg-[#75cf4c] text-center text-white rounded-3xl 
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer text-sm font-semibold md:text-base"
            >
              Login
            </button>
            <span className="text-xs font-semibold tracking-wide">
              OR LOGIN WITH
            </span>
            <div className="flex flex-row gap-4 w-full justify-between mb-10">
              <button
                className="text-sm md:text-base p-2.5 w-full bg-white flex flex-row items-center justify-center text-black font-sm border border-slate-400 rounded-3xl
              hover:bg-slate-50 active:bg-slate-100 transition duration-300 ease-in-out cursor-pointer"
              >
                <FcGoogle className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center w-full mx-2 truncate">Google</span>
                <div className="w-5" aria-hidden="true" />
              </button>

              <button
                className="text-sm md:text-base p-2.5 w-full bg-[#1877F2] flex flex-row items-center justify-center text-white font-sm rounded-3xl 
                hover:bg-[#166fe5] active:bg-[#0e56c4] transition duration-300 ease-in-out cursor-pointer"
              >
                <FaFacebook className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center w-full mx-2 truncate">
                  Facebook
                </span>
                <div className="w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 mt-5">
              <div className="flex flex-row gap-1">
                <p className="text-sm font-semibold">Don't have an account?</p>
                <a
                  className="text-sm font-medium text-blue-700 hover:underline"
                  href="/register"
                >
                  Sign up
                </a>
              </div>
              <div className="group flex flex-row gap-2 relative items-center">
                <FaArrowLeft className="absolute -translate-x-6 transition-transform duration-200 group-hover:-translate-x-7" />
                <button
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-xs font-semibold hover:underline"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
