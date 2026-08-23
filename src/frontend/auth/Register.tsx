import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPen,
  FaPhone,
  FaLeaf,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// import { LuCircleAlert } from "react-icons/lu";

import {
  sanitizeName,
  sanitizeUsername,
  sanitizePhone,
  sanitizeEmail,
  sanitizePassword,
  checkEmailValidity,
  checkPhoneValidity,
  checkUsernameValidity,
  evaluatePasswordStrength,
} from "../validator/authForms";

import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { CreateUser } from "../schema/users";

const Register = () => {
  const [isShowPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidUsername, setIsValidUsername] = useState<boolean>(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [hasReadPrivacyPolicy, setHasReadPrivacyPolicy] =
    useState<boolean>(false);
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  const [hasUppercase, setHasUppercase] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasLowercase, setHasLowerCase] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [hasValidLength, setHasValidLength] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");

  // const [hasError, setHasError] = useState<boolean>(false);
  // const [error, setError] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const canRegister =
    isValidEmail &&
    isValidUsername &&
    isValidPhone &&
    isValidPassword &&
    password === confirmPassword &&
    hasReadPrivacyPolicy &&
    hasConsent;

  const areFormsValid =
    isValidEmail &&
    isValidUsername &&
    isValidPhone &&
    isValidPassword &&
    password === confirmPassword;

  const registrationData: CreateUser = {
    firstName,
    lastName,
    email,
  };

  sessionStorage.setItem(
    "pendingRegistration",
    JSON.stringify(registrationData),
  );

  const { signUp } = useSignUp();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(sanitizeName(e.target.value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(sanitizeName(e.target.value));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(sanitizeUsername(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(sanitizePhone(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(sanitizeEmail(e.target.value));
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

  const handleUsernameBlur = () => {
    if (!checkUsernameValidity(username)) {
      setUsernameError(
        "Username must be 3-30 characters using only letters, numbers, or underscores",
      );
      setIsValidUsername(false);
    } else {
      setUsernameError("");
      setIsValidUsername(true);
    }
  };

  const handleEmailBlur = () => {
    if (!checkEmailValidity(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setIsValidEmail(true);
      setEmailError("");
    }
  };

  const handlePhoneBlur = () => {
    if (!checkPhoneValidity(phoneNumber)) {
      setPhoneError("Please enter a valid PH phone number");
      setIsValidPhone(false);
    } else {
      setPhoneError("");
      setIsValidPhone(true);
    }
  };

  const signUpMutation = useMutation({
    mutationFn: async () => {
      const clerkResult = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      const verificationResult = await signUp.verifications.sendEmailCode();

      if (verificationResult.error) {
        throw verificationResult.error;
      }

      return clerkResult;
    },
  });

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      await signUpMutation.mutateAsync();
      navigate("/verification");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <main className="flex flex-row min-h-screen justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-3xl w-280 h-auto">
        <div className="flex-col justify-center items-center hidden md:flex gap-5">
          <h1>Welcome to LeafTrade</h1>
        </div>
        <div className="w-full flex flex-col p-9 justify-evenly">
          <div className="flex flex-col items-center justify-center gap-2 mb-10">
            <div className="rounded-xl shadow-2xl shadow-black p-2 mb-5">
              <FaLeaf size={35} className="text-[#75cf4c]" />
            </div>
            <h1 className="tracking-wider text-2xl font-bold">Leaf Trade</h1>
            <p className="text-sm font-semibold">Register your account</p>
          </div>
          <form
            className="gap-3 flex flex-col md:gap-7 [&_input]:text-sm [&_input]:py-3 [&_label]:text-xs md:[&_label]:text-sm md:[&_label]:font-medium"
            onSubmit={handleRegisterSubmit}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label>First name</label>
                <div className="relative">
                  <FaPen
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                    type="text"
                    placeholder="Juan Dela"
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                    minLength={1}
                    maxLength={50}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Last name</label>
                <input
                  className="w-full p-2 pl-5 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                  placeholder="Cruz"
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                  minLength={1}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <div className="relative">
                <FaEnvelope
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="juan@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
              </div>
              <div>
                <p className="text-red-400 text-xs md:text-sm">{emailError}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Username</label>
              <div className="relative">
                <FaUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={15}
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                  autoComplete="off"
                  name="leaftrade-username"
                  required
                  minLength={3}
                  maxLength={30}
                  onBlur={handleUsernameBlur}
                  onChange={handleUsernameChange}
                  value={username}
                  placeholder="juanCruz54"
                />
              </div>
              <div>
                <p className="text-red-400 text-xs md:text-sm">
                  {usernameError}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <div className="relative">
                <FaPhone
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full p-2 pl-10 rounded-3xl border border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  type="text"
                  required
                  placeholder="+639xxxxxxxxx"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                />
              </div>
              <div>
                <p className="text-red-400 text-xs md:text-sm">{phoneError}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
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
            <div className="flex flex-col">
              <div className="flex flex-row my-4 justify-center items-start gap-3">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  disabled={!hasReadPrivacyPolicy}
                  className="mt-1"
                />
                <p className="text-xs md:text-sm">
                  I consent to the collection and processing of my personal
                  data, including uploaded valid ID, for identity verification
                  and reservation purposes in accordance with the
                  <span>
                    <a
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setHasReadPrivacyPolicy(true)}
                      className="text-blue-700 hover:underline"
                    >
                      {" "}
                      Data Privacy Policy
                    </a>
                  </span>
                  .
                </p>
              </div>

              {areFormsValid && !(hasConsent && hasReadPrivacyPolicy) && (
                <p className="text-xs md:text-sm text-red-400">
                  Please read then consent to the data privacy policy
                </p>
              )}
            </div>

            <div
              id="clerk-captcha"
              className="w-full flex items-center justify-start"
            ></div>
            {/* {hasError ? (
              <div className="flex flex-row min-h-12.5 gap-4 items-center p-4 shadow-lg bg-red-100 text-red-600 font-semibold shadow-gray-200 rounded-2xl text-sm">
                <LuCircleAlert />
                <p>{error}</p>
              </div>
            ) : null} */}
            <button
              type="submit"
              disabled={!canRegister}
              className="p-2.5 w-full disabled:opacity-50
              disabled:cursor-not-allowed  text-center text-white rounded-3xl my-10
            hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c] transition duration-300 ease-in-out cursor-pointer text-sm font-semibold md:text-base"
            >
              Register
            </button>
          </form>

          <div className="flex flex-col items-center gap-4 mt-5">
            <div className="flex flex-row gap-1">
              <p className="text-sm font-medium md:font-semibold">
                Already have an account?
              </p>
              <a
                className="text-sm font-medium text-blue-700 hover:underline"
                href="/login"
              >
                Log in
              </a>
            </div>
            <div className="group flex flex-row gap-2 relative items-center">
              <FaArrowLeft className="absolute -translate-x-6 transition-transform duration-200 group-hover:-translate-x-7" />
              <button
                onClick={() => navigate("/")}
                className="cursor-pointer text-xs font-semibold hover:underline"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
