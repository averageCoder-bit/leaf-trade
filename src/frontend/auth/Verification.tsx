import Logo from "../Logo";
const EmailVerification = () => {
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
              <div className="grid grid-cols-6 gap-7 w-60">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="p-2 w-10 h-10 rounded-lg border text-center border-slate-400 focus:outline-none focus:border-[#75cf4c]"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <button
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
