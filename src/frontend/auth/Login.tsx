import {
  FaEnvelope,
  FaUserLock,
  FaLock,
  FaLeaf,
  FaFacebook,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { LuCircleAlert } from "react-icons/lu";

import { sanitizePassword, sanitizeEmail } from "../validator/authForms";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSignIn } from "@clerk/react";
import { isClerkAPIResponseError } from "@clerk/react/errors";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, fetchStatus } = useSignIn();
  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const [isShowPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (rateLimitSeconds <= 0) return;

    const timer = setInterval(() => {
      setRateLimitSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(sanitizeEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePassword(e.target.value);
    setPassword(sanitized);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoggingIn(true);
      setHasError(false);
      setError("");

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.error) {
        if (isClerkAPIResponseError(result.error)) {
          if (result.error.status === 429) {
            const retryAfter = result.error.retryAfter ?? 0;

            setRateLimitSeconds(retryAfter);
            setError(
              "Too many login attempts. Please wait before trying again.",
            );
            setHasError(true);
            return;
          }

          const clerkError = result.error.errors[0];

          if (clerkError?.code === "user_locked") {
            setError(
              "Your account is temporarily locked. Please try again later.",
            );
            setHasError(true);
            return;
          }
        }

        setError("Invalid login credentials.");
        setHasError(true);
        return;
      }

      if (signIn.status === "complete") {
        console.log("Login successful!");
        await signIn.finalize();
        setLogin(true);
        return;
      }

      if (signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code",
        );

        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();

          navigate("/device-verification");
          return;
        }

        setError("Unable to start device verification.");
        setHasError(true);
        return;
      }
    } catch (err) {
      console.error("Unexpected login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.",
      );

      setHasError(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!signIn) return;
    try {
      await signIn.sso({
        strategy: "oauth_google",
        redirectCallbackUrl: "/sso-callback",
        redirectUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Google OAuth initialization failed:", error);
    }
  };

  const handleFacebookLogin = async () => {
    if (!signIn) return;
    try {
      await signIn.sso({
        strategy: "oauth_facebook",
        redirectCallbackUrl: "/sso-callback",
        redirectUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Facebook OAuth initialization failed:", error);
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
                  name="email"
                  autoComplete="email"
                  required
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Password</label>

              <div className="relative w-full">
                <FaLock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={password}
                  type={isShowPassword ? "text" : "password"}
                  onChange={handlePasswordChange}
                  className="w-full rounded-3xl p-2.5 pl-10 pr-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  name="password"
                  required
                  autoComplete="current-password"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center">
                  {isShowPassword ? (
                    <FaEye
                      size={15}
                      title="Hide Password"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      onClick={handleHidePassword}
                    />
                  ) : (
                    <FaEyeSlash
                      size={15}
                      title="Show Password"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end -mt-3">
              <a
                className="text-xs font-medium hover:underline text-blue-700"
                href=""
              >
                Forgot Password?
              </a>
            </div>

            {hasError ? (
              <div className="flex flex-row min-h-12.5 gap-4 items-center p-4 shadow-lg bg-red-100 text-red-600 font-semibold shadow-gray-200 rounded-2xl text-sm">
                <LuCircleAlert />
                <p>{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoggingIn || rateLimitSeconds > 0}
              className="p-2.5 w-full bg-[#75cf4c] text-center text-white rounded-3xl 
            hover:bg-[#85d65c] active:bg-[#5fb33a] transition duration-300 ease-in-out cursor-pointer text-sm font-semibold md:text-base"
            >
              {rateLimitSeconds > 0
                ? `Try again in ${Math.floor(rateLimitSeconds / 60)}:${String(
                    rateLimitSeconds % 60,
                  ).padStart(2, "0")}`
                : "Sign In"}
            </button>
          </form>
          <div className="flex flex-col items-center">
            <div className="flex flex-row w-full items-center justify-center p-3 mb-7">
              <hr className="border-t border-gray-300 w-full" />
              <span className="text-xs md:text-sm font-semibold tracking-wide text-center w-full">
                Or continue with
              </span>
              <hr className="border-t border-gray-300 w-full" />
            </div>

            <div className="flex flex-row gap-4 w-full justify-between mb-10">
              <button
                className="text-sm md:text-base p-2.5 w-full bg-white flex flex-row items-center justify-center text-black font-sm border border-slate-400 rounded-3xl
              hover:bg-slate-50 active:bg-slate-100 transition duration-300 ease-in-out cursor-pointer"
                onClick={handleGoogleLogin}
                disabled={fetchStatus === "fetching"}
              >
                <FcGoogle className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center w-full mx-2 truncate">Google</span>

                <div className="w-5" aria-hidden="true" />
              </button>

              <button
                onClick={handleFacebookLogin}
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
