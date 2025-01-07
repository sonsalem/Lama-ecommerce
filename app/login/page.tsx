"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Slider from "@/Components/Slider";
import SliderLogin from "@/Components/SliderLogin";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const page = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) router.push("/");

  const [mode, setMode] = useState(MODE.LOGIN);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : mode === MODE.EMAIL_VERIFICATION
      ? "Verif Your Email"
      : "";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : mode === MODE.EMAIL_VERIFICATION
      ? "Verif"
      : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let response;

    try {
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: userName },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
          break;
      }
    } catch (error) {
      setError("Somthing Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex gap-2 flex-col lg:flex-row">
      <form
        onSubmit={handleSubmit}
        className="h-full flex-1 flex flex-col gap-8 lg:w-1/2 p-8 justify-center items-center lg:self-center"
      >
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="logouimage" width={30} height={24} />
          <h1 className="text-3xl font-bold">{formTitle}</h1>
          <p className="text-gray-500 text-sm">Welcome to LAMA E-commerce</p>
        </div>
        {mode === MODE.REGISTER ? (
          <div className=" flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              name="username"
              className="ring-1 ring-gray-300 w-full rounded-md p-4 transition-all focus:ring-lama focus:outline-none "
              placeholder="SonSalem.."
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className=" flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className="ring-1 ring-gray-300 w-full rounded-md p-4 transition-all focus:ring-lama focus:border-none focus:outline-none "
              placeholder="sonsalem@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className=" flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700" htmlFor="emailCode">
              Verification Code
            </label>
            <input
              type="text"
              name="emailCode"
              className="ring-1 ring-gray-300 w-full rounded-md p-4 transition-all focus:ring-lama focus:outline-none "
              placeholder="sonsalem@gmail.com"
              onChange={(e) => setEmailCode(e.target.value)}
            />
          </div>
        )}
        {mode === MODE.REGISTER || mode === MODE.LOGIN ? (
          <div className=" flex flex-col gap-2 w-full">
            <label className="text-sm text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="ring-1 ring-gray-300 w-full rounded-md p-4 transition-all focus:ring-lama focus:outline-none "
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {mode === MODE.LOGIN && (
              <div
                className="text-start w-full cursor-pointer underline text-sm"
                onClick={() => setMode(MODE.RESET_PASSWORD)}
              >
                Forget Password?
              </div>
            )}
          </div>
        ) : null}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-lama text-white py-2 text-lg w-36 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed
        ring-1 ring-lama transition hover:bg-white hover:text-lama "
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {mode === MODE.LOGIN && (
          <div
            className="text-start w-full cursor-pointer underline text-sm"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don't have a account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-start w-full cursor-pointer underline text-sm"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have a account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-start w-full cursor-pointer underline text-sm"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go To Login?
          </div>
        )}
        {message && <div className="text-green-600 text-sm">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <div className="hidden lg:block w-1/2 relative lg:border-l-lama border-l-[10px]">
        <SliderLogin />
      </div>
    </div>
  );
};

export default page;
