import { Link } from "react-router-dom";
import {
  LuSearchX,
  LuLockKeyhole,
  LuShieldAlert,
  LuServerCrash,
  LuHouse,
  LuRefreshCw,
} from "react-icons/lu";
import Logo from "../Logo";

import type { IconType } from "react-icons";

type ErrorCode = 401 | 403 | 404 | 500;

interface ErrorConfig {
  title: string;
  description: string;
  icon: IconType;
  color: string;
  button: string;
  path: string | null;
}

interface ErrorPageProps {
  code: ErrorCode;
}

const errorConfig: Record<ErrorCode, ErrorConfig> = {
  401: {
    title: "Authentication Required",
    description: "Please sign in to continue.",
    icon: LuLockKeyhole,
    color: "bg-blue-600",
    button: "Sign In",
    path: "/login",
  },
  403: {
    title: "Access Forbidden",
    description: "You don't have permission to view this page.",
    icon: LuShieldAlert,
    color: "bg-amber-500",
    button: "Return Home",
    path: "/",
  },
  404: {
    title: "Lost in the leaves?",
    description: "The page you're looking for doesn't exist or may have moved.",
    icon: LuSearchX,
    color: "bg-[#75cf4c]",
    button: "Return Home",
    path: "/",
  },
  500: {
    title: "Something Went Wrong",
    description: "We're having trouble on our end. Please try again later.",
    icon: LuServerCrash,
    color: "bg-red-600",
    button: "Try Again",
    path: null,
  },
};

export default function ErrorPage({ code }: ErrorPageProps) {
  const error = errorConfig[code];
  const Icon = error.icon;

  const buttonClass = `
    inline-flex items-center justify-center gap-2
    rounded-xl px-6 py-3
    text-sm font-semibold text-white
    shadow-md transition-all duration-300
    hover:-translate-y-1 hover:shadow-lg
    cursor-pointer ${error.color}
  `;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className="w-full p-5 sm:p-8">
        <Logo />
      </nav>

      {/* Error Content */}
      <main className="flex flex-1 items-center justify-center px-6 pb-20">
        <div className="flex w-full max-w-xl flex-col items-center text-center">
          {/* Status Code and Icon */}
          <div className="relative mb-10 flex h-40 w-full items-center justify-center">
            <span
              aria-hidden="true"
              className="select-none text-[clamp(7rem,20vw,11rem)] font-black leading-none text-slate-100"
            >
              {code}
            </span>

            <div
              className={`absolute flex h-20 w-20 -rotate-12 items-center justify-center rounded-2xl ${error.color} text-white shadow-xl`}
            >
              <Icon size={36} aria-hidden="true" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {error.title}
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            {error.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {error.path ? (
              <Link to={error.path} className={buttonClass}>
                <LuHouse size={18} />
                {error.button}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={buttonClass}
              >
                <LuRefreshCw size={18} />
                {error.button}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
