import { useClerk } from "@clerk/react";
import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import createUser from "../services/AuthService";
import type { CreateUser } from "../types/users";

const Dashboard = () => {
  const { signOut } = useClerk();
  const { getToken, isSignedIn } = useAuth();
  const handleLogout = async () => {
    await signOut({ redirectUrl: "/login" });
  };

  useEffect(() => {
    const testBackendAuth = async () => {
      if (!isSignedIn) return;

      const token = await getToken({
        template: "fastapi",
      });

      console.log("JWT:", token);

      if (!token) {
        console.error("No JWT available");
        return;
      }

      const testUser: CreateUser = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        username: "testuser",
        phoneNumber: "09123456789",
      };

      try {
        const response = await createUser(testUser, token);

        console.log("Backend response:", response);
      } catch (error) {
        console.error("Backend authentication test failed:", error);
      }
    };

    testBackendAuth();
  }, [isSignedIn, getToken]);

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
