import { useClerk, useSignIn, useSignUp } from "@clerk/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";

const SSOCallback = () => {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const navigate = useNavigate();

  const hasRun = useRef(false);

  useEffect(() => {
    if (!clerk.loaded || hasRun.current) return;

    hasRun.current = true;

    const handleCallback = async () => {
      // Existing Clerk user
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: () => {
            navigate("/dashboard", { replace: true });
          },
        });

        return;
      }

      // New Clerk user
      if (signIn.isTransferable) {
        await signUp.create({ transfer: true });

        if (signUp.status === "complete") {
          await signUp.finalize({
            navigate: () => {
              navigate("/dashboard", { replace: true });
            },
          });

          return;
        }

        console.log("Additional sign-up information required.");
        return;
      }

      // No valid SSO flow
      navigate("/login", { replace: true });
    };

    handleCallback().catch((error) => {
      console.error("SSO callback failed:", error);
      navigate("/login", { replace: true });
    });
  }, [clerk, signIn, signUp, navigate]);

  return (
    <main className="flex min-h-screen">
      <nav className="fixed z-50 flex w-full flex-row items-center justify-between bg-white p-4">
        <Logo />
      </nav>

      <div className="relative flex w-full items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10 flex flex-col space-y-7 p-2">
            <h1 className="text-4xl font-bold tracking-wide md:text-6xl">
              Clerk OAuthentication
            </h1>
            <div id="clerk-captcha" />
            <p className="text-sm md:text-base">
              Hang tight, completing authentication...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SSOCallback;
