import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import google from "../assets/google-original.svg";
import facebook from "../assets/facebook-original.svg";

const Login = forwardRef((props, ref) => {
  const modalRef = useRef(null);
  const [mode, setMode] = useState("login"); // "login" or "signup"

  useImperativeHandle(ref, () => ({
    openModal: (type = "login") => {
      setMode(type); // when opened, decide mode
      modalRef.current?.showModal();
    },
    closeModal: () => {
      modalRef.current?.close();
    },
  }));

  return (
    <dialog ref={modalRef} id="auth_modal" className="modal">
      <div className="relative w-full max-w-xs modal-box sm:max-w-sm md:max-w-md">
        {/* Close Button */}
        <div className="absolute modal-action top-2 right-2">
          <form method="dialog">
            <button className="btn btn-sm btn-circle hover:text-red-500">
              ✕
            </button>
          </form>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-center">
          {mode === "login" ? "Login Required 🔐" : "Create an Account ✨"}
        </h3>
        <p className="py-2 text-sm font-normal text-center sm:text-base">
          {mode === "login"
            ? "Welcome back! Please sign in to continue."
            : "Join us today! Fill in your details to get started."}
        </p>

        {/* Form */}
        <form className="flex flex-col gap-3 mt-4 sm:gap-4">
          {/* Email */}
          <label className="flex items-center w-full gap-2 input input-bordered">
            <input type="email" className="text-sm grow" placeholder="Email" />
          </label>

          {/* Password */}
          <label className="flex w-full gap-2 input input-bordered">
            <input
              type="password"
              className="text-sm grow"
              placeholder="Password"
            />
          </label>

          {/* Extra confirm password for signup */}
          {mode === "signup" && (
            <label className="flex w-full gap-2 input input-bordered">
              <input
                type="password"
                className="text-sm grow"
                placeholder="Confirm Password"
              />
            </label>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full btn btn-primary">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="text-xs text-gray-500 divider sm:text-sm">
            or continue with
          </div>

          {/* Social Login */}
          <div className="flex flex-col w-full gap-2 sm:flex-row">
            <button className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg bg-base-300 hover:bg-base-200 sm:w-1/2">
              <img src={google} alt="Google Icon" className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg bg-base-300 hover:bg-base-200 sm:w-1/2">
              <img src={facebook} alt="Facebook Icon" className="w-5 h-5" />
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          {/* Toggle link */}
          <div className="flex justify-center gap-2 mx-auto mt-2 text-xs sm:text-sm">
            {mode === "login" ? (
              <>
                <p className="text-gray-500">Don't have an account?</p>
                <button
                  type="button"
                  className="font-medium hover:text-blue-500"
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-500">Already have an account?</p>
                <button
                  type="button"
                  className="font-medium hover:text-blue-500"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* Backdrop click to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

export default Login;
