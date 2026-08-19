import Logo from "../Logo";
import { useRef, useState, useEffect } from "react";
import { useSignIn } from "@clerk/react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeviceVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { signIn } = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      signIn.status !== "needs_second_factor" &&
      signIn.status !== "needs_client_trust"
    ) {
      navigate("/login", { replace: true });
      return;
    }

    setIsAuthorized(true);
  }, [signIn, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);
    setHasError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
    setHasError(false);

    inputRefs.current[5]?.focus();
  };

  const handleClientTrustVerification = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const verificationCode = otp.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter all 6 digits before verifying.");
      setHasError(true);
      return;
    }

    try {
      setIsVerifying(true);
      setHasError(false);
      setError("");

      await signIn.mfa.verifyEmailCode({
        code: verificationCode,
      });

      await signIn.finalize();

      console.log("Device verified successfully!");

      setIsVerified(true);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Client Trust verification failed:", err);

      setError("Invalid verification code. Please try again.");
      setHasError(true);
      setIsVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="flex min-h-screen">
      <nav className="fixed z-50 flex w-full flex-row items-center justify-between bg-white p-4">
        <Logo />
      </nav>

      <div className="relative flex w-full items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10 flex flex-col space-y-7 p-2">
            <h1 className="text-4xl font-bold tracking-wide md:text-6xl">
              Verify your device
            </h1>

            <p className="text-sm md:text-base">
              We sent a verification code to your email address. Enter the code
              below to verify this device and continue signing in to your
              LeafTrade account.
            </p>

            <form onSubmit={handleClientTrustVerification}>
              <div className="flex flex-col justify-start gap-4">
                <div className="flex gap-2">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isVerified || isVerifying}
                      className="h-10 w-10 rounded-lg border border-slate-400 p-2 text-center focus:border-[#75cf4c] focus:outline-none disabled:opacity-70"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-col">
                {hasError && (
                  <p className="mb-2 text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || isVerified}
                  className="flex w-full items-center justify-center gap-2 rounded-3xl bg-[#75cf4c] p-2 text-center font-medium text-white duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:w-50"
                >
                  {isVerifying ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : isVerified ? (
                    "Device Verified"
                  ) : (
                    "Verify device"
                  )}
                </button>

                <p className="mt-5 text-sm">
                  Didn't receive it?{" "}
                  <span className="text-blue-700 hover:underline">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Resend verification email
                    </a>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeviceVerification;
