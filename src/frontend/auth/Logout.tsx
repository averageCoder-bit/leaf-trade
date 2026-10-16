import { useClerk } from "@clerk/react";
import { showToast } from "../components/ToastUI";

interface LogoutProps {
  showLogoutConfirm: boolean;
  setShowLogoutConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}
const Logout = ({ showLogoutConfirm, setShowLogoutConfirm }: LogoutProps) => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    sessionStorage.setItem("logoutToast", "true");

    try {
      await signOut({ redirectUrl: "/login" });
    } catch (error) {
      sessionStorage.removeItem("logoutToast");
      console.error("Logout failed:", error);
      showToast("Failed to log out.", "error");
    }
  };

  if (!showLogoutConfirm) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold">Log out?</h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to log out of your account?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="rounded-3xl cursor-pointer px-6 py-2 hover:bg-gray-100 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="rounded-3xl cursor-pointer bg-red-500 px-6 py-2 text-white hover:bg-red-600 text-sm"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Logout;
