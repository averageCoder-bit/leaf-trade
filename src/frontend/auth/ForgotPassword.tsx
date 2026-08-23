import Logo from "../Logo";
import { useState, useRef } from "react";
import {
  sanitizePassword,
  evaluatePasswordStrength,
} from "../validator/authForms";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
const ForgotPassword = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isVerifying] = useState(false);
  const [isVerified] = useState(false);
  const [isCodeSent] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [hasUppercase, setHasUppercase] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasLowercase, setHasLowerCase] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [hasValidLength, setHasValidLength] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePassword(e.target.value);
    setPassword(sanitized);

    const metrics = evaluatePasswordStrength(sanitized);

    setHasUppercase(metrics.upper);
    setHasNumber(metrics.num);
    setHasLowerCase(metrics.lower);
    setHasSpecialChar(metrics.special);
    setHasValidLength(metrics.len);

    setIsValidPassword(
      metrics.upper &&
        metrics.num &&
        metrics.lower &&
        metrics.special &&
        metrics.len,
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(sanitizePassword(e.target.value));
  };

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
  return (
    <main className="flex min-h-screen">
      <nav className="fixed z-50 flex w-full flex-row items-center justify-between bg-white p-4">
        <Logo />
      </nav>

      <div className="relative flex w-full items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10 flex flex-col space-y-7 p-2">
            <h1 className="text-4xl font-bold tracking-wide md:text-6xl">
              Forgot your password?
            </h1>

            <p className="text-sm md:text-base">
              We will send a verification code to your email address. Enter the
              code below to reset your password then type in your new password.
            </p>

            <form>
              {isCodeSent ? (
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
              ) : null}

              {isVerified ? (
                <div className="grid grid-rows-2 gap-3 max-w-xs">
                  <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <div className="relative">
                      <FaLock
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        className="w-full rounded-3xl p-2 pl-10 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                        type={isShowPassword ? "text" : "password"}
                        minLength={15}
                        maxLength={64}
                        required
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    {!password ? null : (
                      <div className="flex flex-col text-xs md:text-sm mt-2">
                        <span className="flex flex-row gap-2 items-center">
                          {hasUppercase ? (
                            <FaCheckCircle className="text-[#75cf4c]" />
                          ) : (
                            <FaTimesCircle className="text-red-400" />
                          )}
                          At least one uppercase letter
                        </span>
                        <span className="flex flex-row gap-2 items-center">
                          {hasLowercase ? (
                            <FaCheckCircle className="text-[#75cf4c]" />
                          ) : (
                            <FaTimesCircle className="text-red-400" />
                          )}
                          At least one lowercase letter
                        </span>
                        <span className="flex flex-row gap-2 items-center">
                          {hasNumber ? (
                            <FaCheckCircle className="text-[#75cf4c]" />
                          ) : (
                            <FaTimesCircle className="text-red-400" />
                          )}
                          At least one number
                        </span>
                        <span className="flex flex-row gap-2 items-center">
                          {hasSpecialChar ? (
                            <FaCheckCircle className="text-[#75cf4c]" />
                          ) : (
                            <FaTimesCircle className="text-red-400" />
                          )}
                          At least one special character
                        </span>
                        <span className="flex flex-row gap-2 items-center">
                          {hasValidLength ? (
                            <FaCheckCircle className="text-[#75cf4c]" />
                          ) : (
                            <FaTimesCircle className="text-red-400" />
                          )}
                          At least 15 characters in length
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Confirm Password</label>
                    <div className="relative">
                      {isShowPassword ? (
                        <FaEye
                          size={15}
                          title="Hide Password"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                          onClick={handleHidePassword}
                        />
                      ) : (
                        <FaEyeSlash
                          size={15}
                          title="Show Password"
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      )}
                      <input
                        className="w-full rounded-3xl p-2 pl-5 border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                        type={isShowPassword ? "text" : "password"}
                        disabled={isValidPassword ? false : true}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col text-xs md:text-sm mt-2 text-red-400">
                      {!password ? null : !isValidPassword ? (
                        <p>Please satisfy the password requirements</p>
                      ) : password !== confirmPassword ? (
                        <p>Passwords do not match</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-7 flex flex-col">
                {hasError && (
                  <p className="mb-2 text-sm text-red-400">{error}</p>
                )}

                <button
                  type={isVerified ? "button" : "submit"}
                  disabled={isVerifying}
                  className="flex flex-row w-full items-center justify-center gap-2 rounded-3xl bg-[#75cf4c] p-2 text-center font-medium text-white duration-300 hover:-translate-y-1 hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 md:w-50"
                >
                  Send reset code
                </button>

                <p className="mt-5 text-sm">
                  Didn't receive it?{" "}
                  <span className="text-blue-700 hover:underline">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Resend reset password email
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

export default ForgotPassword;
