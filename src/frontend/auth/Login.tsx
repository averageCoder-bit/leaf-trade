import {
  FaEnvelope,
  FaLock,
  FaLeaf,
  FaFacebook,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const LoginStatus = () => {
    setLogin(true);
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-280 h-auto shadow-2xl rounded-3xl">
        <div className="flex-col justify-center items-center hidden md:flex gap-5">
          <FaLock size={140} className="text-[#75cf4c]" />
          {login ? (
            <p className="font-semibold">Welcome back user</p>
          ) : (
            <p className="font-semibold">Secured account</p>
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
            className="grid grid-rows-2 gap-7 p-3 mb-7"
            action="/dashboard"
            method="get"
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
                  className="w-full rounded-3xl p-2.5 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="password"
                />
              </div>
            </div>
            <div className="flex justify-between -mt-3">
              <div className="flex flex-row">
                <input type="checkbox" />
                <span className="text-xs ml-1">Trust this device</span>
              </div>

              <a
                className="text-xs font-semibold hover:underline text-blue-700"
                href=""
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="flex flex-col items-center p-3 gap-5">
            <button
              onClick={LoginStatus}
              className="p-2.5 w-full bg-[#75cf4c] text-center text-white font-medium rounded-3xl 
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer"
            >
              LOGIN
            </button>
            <span className="text-xs font-semibold tracking-wide">
              OR LOGIN WITH
            </span>
            <div className="flex flex-row w-full gap-3 mb-10">
              <div className="relative flex flex-row w-full">
                <FcGoogle
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />
                <button
                  className="p-2.5 w-full bg-white  text-center text-black font-sm border border-slate-400 rounded-3xl
                 transition duration-300 ease-in-out cursor-pointer"
                >
                  Google
                </button>
              </div>
              <div className="relative flex flex-row w-full">
                <FaFacebook
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                />
                <button
                  className="p-2.5 w-full bg-[#1877F2] text-center text-white font-sm rounded-3xl 
                hover:bg-[#166fe5] active:bg-[#0e56c4] transition duration-300 ease-in-out cursor-pointer"
                >
                  Facebook
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 mt-5">
              <div className="flex flex-row gap-1">
                <p className="text-sm font-semibold">Don't have an account?</p>
                <a
                  className="text-sm font-semibold text-blue-700 hover:underline"
                  href="/register"
                >
                  Sign up
                </a>
              </div>
              <div className="flex flex-row gap-2 relative">
                <FaArrowLeft className="absolute -translate-x-6 hover:-translate-x-7" />
                <button
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-xs font-bold hover:cursor-pointer hover:underline"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
