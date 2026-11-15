import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPen,
  FaPhone,
  FaLeaf,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-3xl w-280 h-auto">
        <div className="flex-col justify-center items-center hidden md:flex gap-5 bg-red-400">
          <h1>Welcome to LeafTrade</h1>
        </div>
        <div className="w-full flex flex-col p-9 justify-evenly">
          <div className="flex flex-col items-center justify-center gap-2 mb-10">
            <div className="rounded-xl shadow-2xl shadow-black p-2 mb-5">
              <FaLeaf size={35} className="text-[#75cf4c]" />
            </div>
            <h1 className="tracking-wider text-2xl font-bold">Leaf Trade</h1>
            <p className="text-sm font-semibold">Register your account</p>
          </div>
          <form className="gap-3 flex flex-col md:gap-7" action="">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <FaUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={15}
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Fullname</label>
              <div className="relative">
                <FaPen
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <FaEnvelope
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <FaPhone
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                />
              </div>
            </div>

            <div className="gap-3 flex flex-row justify-between">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <FaLock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="w-full rounded-3xl p-2 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <FaLock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="w-full rounded-3xl p-2 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    type="password"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </form>

          <button
            className="p-2.5 w-full bg-[#75cf4c] text-center text-white font-medium rounded-3xl mt-10 mb-10
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer"
          >
            Register
          </button>
          <div className="flex flex-col items-center gap-4 mt-5">
            <div className="flex flex-row gap-1">
              <p className="text-sm font-semibold">Already have an account?</p>
              <a
                className="text-sm font-semibold text-blue-700 hover:underline"
                href="/login"
              >
                Log in
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
  );
};

export default Register;
