import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPen,
  FaPhone,
  FaLeaf,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Register = () => {
  const [isShowPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: () =>
      signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        username,
        phoneNumber,
      }),
  });

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUpMutation.mutateAsync();

      if (signUp.status === "missing_requirements") {
        navigate("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-row min-h-screen justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-3xl w-280 h-auto">
        <div className="flex-col justify-center items-center hidden md:flex gap-5">
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
          <form
            className="gap-3 flex flex-col md:gap-7 [&_input]:text-sm [&_input]:py-3 [&_label]:text-xs md:[&_label]:text-sm md:[&_label]:font-medium"
            onSubmit={handleRegisterSubmit}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label>First name</label>
                <div className="relative">
                  <FaPen
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    type="text"
                    placeholder="Juan Dela"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Last name</label>
                <input
                  className="w-full p-2 pl-5 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                  placeholder="Cruz"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <div className="relative">
                <FaEnvelope
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="juan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Username</label>
              <div className="relative">
                <FaUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={15}
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                  autoComplete="off"
                  name="leaftrade-username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <div className="relative">
                <FaPhone
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                  required
                  placeholder="+63 9xx-xxx-xxxx"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label>Password</label>
                <div className="relative">
                  <FaLock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="w-full rounded-3xl p-2 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    type={isShowPassword ? "text" : "password"}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Confirm Password</label>
                <div className="relative">
                  {isShowPassword ? (
                    <FaEye
                      size={15}
                      title="Hide Password"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      onClick={handleHidePassword}
                    />
                  ) : (
                    <FaEyeSlash
                      size={15}
                      title="Show Password"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                  <input
                    className="w-full rounded-3xl p-2 pl-5 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    type={isShowPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row my-4 justify-center items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <p className="text-xs md:text-sm">
                I consent to the collection and processing of my personal data,
                including uploaded valid ID, for identity verification and
                reservation purposes in accordance with the
                <span>
                  <a href="" className="text-blue-700 hover:underline">
                    {" "}
                    Data Privacy Policy
                  </a>
                </span>
                .
              </p>
            </div>
          </form>

          <button
            className="p-2.5 w-full bg-[#75cf4c] text-center text-white rounded-3xl my-10
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer text-sm font-semibold md:text-base"
          >
            Register
          </button>
          <div className="flex flex-col items-center gap-4 mt-5">
            <div className="flex flex-row gap-1">
              <p className="text-sm font-medium md:font-semibold">
                Already have an account?
              </p>
              <a
                className="text-sm font-medium text-blue-700 hover:underline"
                href="/login"
              >
                Log in
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
    </main>
  );
};

export default Register;
