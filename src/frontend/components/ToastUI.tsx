import { Toaster, toast } from "sonner";
import {
  LuCircleCheck,
  LuCircleX,
  LuInfo,
  LuLogOut,
  LuTimerOff,
  LuX,
} from "react-icons/lu";

type ToastVariant = "success" | "error" | "info" | "logout" | "timeout";

interface ToastProps {
  id: string | number;
  message: string;
  variant: ToastVariant;
}

const variants = {
  success: {
    style: "bg-green-600 border-green-600 text-white",
    icon: LuCircleCheck,
  },
  error: {
    style: "bg-red-600 border-red-600 text-white",
    icon: LuCircleX,
  },
  info: {
    style: "bg-blue-600 border-blue-600 text-white",
    icon: LuInfo,
  },
  logout: {
    style: "bg-slate-700 border-slate-700 text-white",
    icon: LuLogOut,
  },
  timeout: {
    style: "bg-orange-600 border-orange-600 text-white",
    icon: LuTimerOff,
  },
};

function ToastTemplate({ id, message, variant }: ToastProps) {
  const { style, icon: Icon } = variants[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`
        flex w-full sm:w-80
        max-w-[calc(100vw-2rem)]
        items-center justify-between gap-2 sm:gap-3
        rounded-xl border p-3 shadow-lg
        ${style}
      `}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Icon size={20} className="shrink-0" aria-hidden="true" />
        <p className="min-w-0 break-words text-sm font-medium">{message}</p>
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => toast.dismiss(id)}
        className="flex min-h-11 min-w-11 shrink-0
                   cursor-pointer items-center justify-center
                   rounded-lg opacity-80 transition-opacity
                   hover:opacity-100"
      >
        <LuX size={18} />
      </button>
    </div>
  );
}

export function ToastUI() {
  return <Toaster position="top-center" />;
}

export function showToast(message: string, variant: ToastVariant = "info") {
  return toast.custom(
    (id) => <ToastTemplate id={id} message={message} variant={variant} />,
    { duration: 2000 },
  );
}
