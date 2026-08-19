import { useClerk } from "@clerk/react";

const Dashboard = () => {
  const { signOut } = useClerk();
  const handleLogout = async () => {
    await signOut({ redirectUrl: "/login" });
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-400 text-white hover:cursor-pointer"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Dashboard;
