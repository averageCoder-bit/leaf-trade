import Logo from "../Logo";
import { useRef, useState, useEffect } from "react";
import { useSignUp } from "@clerk/react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { signUp } = useSignUp();
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const canVerifyEmail =
      signUp.status === "missing_requirements" &&
      signUp.missingFields.length === 0 &&
      signUp.unverifiedFields.includes("email_address");

    if (!canVerifyEmail) {
      navigate("/register", { replace: true });
      return;
    }

    setIsAuthorized(true);
  }, [signUp, navigate]);

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const finalCode = otp.join("");

    if (finalCode.length !== 6) {
      setError("Please enter all 6 digits before verifying.");
      setHasError(true);
      return;
    }

    try {
      setIsVerifying(true);
      setHasError(false);
      setError("");

      console.log("Verifying email code...");

      const result = await signUp.verifications.verifyEmailCode({
        code: finalCode,
      });

      console.log("Verification result:", result);

      if (result.error) {
        setError(result.error.message);
        setHasError(true);
        setIsVerified(false);
        return;
      }

      setIsVerified(true);
    } catch (err) {
      console.error("Verification error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.",
      );

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
              Check your email
            </h1>

            <p className="text-sm md:text-base">
              We sent a verification code to your email address. Enter the code
              below to verify your account and continue setting up your
              LeafTrade account.
            </p>

            <form onSubmit={handleSubmit}>
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
                      disabled={isVerified}
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
                  type={isVerified ? "button" : "submit"}
                  onClick={isVerified ? () => navigate("/login") : undefined}
                  disabled={isVerifying}
                  className="flex w-full items-center justify-center gap-2 rounded-3xl bg-[#75cf4c] p-2 text-center font-medium text-white duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:w-50"
                >
                  {isVerifying ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : isVerified ? (
                    "Success! Go to Login"
                  ) : (
                    "Verify code"
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

export default EmailVerification;
