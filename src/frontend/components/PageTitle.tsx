import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/login": "Login",
  "/register": "Register",
  "/marketplace": "Marketplace",
  "/dashboard": "Dashboard",
  "/products": "My Products",
};

export default function PageTitle(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageTitles[pathname];

    document.title = page ? `LeafTrade | ${page}` : "LeafTrade";
  }, [pathname]);

  return null;
}
