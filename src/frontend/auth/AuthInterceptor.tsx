import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import { setupAuthInterceptor } from "../hooks/api";

const AuthInterceptor = (): null => {
  const { getToken } = useAuth();

  useEffect(() => {
    const cleanup = setupAuthInterceptor(getToken);

    return cleanup;
  }, [getToken]);

  return null;
};

export default AuthInterceptor;
