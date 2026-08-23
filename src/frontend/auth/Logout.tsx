import { useClerk } from "@clerk/react";

interface LogoutProps {
  showLogoutConfirm: boolean;
  setShowLogoutConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}
const Logout = ({ showLogoutConfirm, setShowLogoutConfirm }: LogoutProps) => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/login" });
  };

  if (!showLogoutConfirm) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-96 rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">Log out?</h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to log out of your account?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="rounded-3xl cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="rounded-3xl cursor-pointer bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Logout;
