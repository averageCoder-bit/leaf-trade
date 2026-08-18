import Logo from "../Logo";
import { useState, useRef } from "react";
import { useSignUp } from "@clerk/react";

const EmailVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const { signUp } = useSignUp();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ): void => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    if (val && index < 5) {
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

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const finalCode = otp.join("");

      await signUp.verifications.verifyEmailCode({
        code: finalCode,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
      setHasError(true);
    }
  };

  return (
    <main className="flex min-h-screen">
      <nav className="flex flex-row fixed w-full justify-between items-center p-4 bg-white z-50">
        <Logo />
      </nav>

      <div className="flex flex-row gap-4 p-4 justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col mb-10 space-y-7 p-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
              Check your email
            </h1>
            <p className="text-sm md:text-base">
              We sent a verification code to your email address. Enter the code
              below to verify your account and continue setting up your
              LeafTrade account.
            </p>
            <form>
              <div className="flex flex-col justify-start gap-4">
                <div className="flex gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={data}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined} // Only paste on the first input
                      className="p-2 w-10 h-10 rounded-lg border text-center border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col mt-7">
                <div>
                  {hasError ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : null}
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-[#75cf4c] text-center text-white font-medium rounded-3xl 
                  hover:bg-[#85d65c] active:bg-[#5fb33a] hover:cursor-pointer duration-300 w-full md:w-50 p-2 hover:-translate-y-1"
                >
                  Verify code
                </button>

                <p className="mt-5 text-sm">
                  Didn't received it?{" "}
                  <span className="text-blue-700 hover:underline">
                    <a href="">Resend verification email</a>
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
