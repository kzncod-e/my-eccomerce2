"use client";
import handleFormAction from "./action";
import ClientFlashComponents from "../components/ClientFlashComponents";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Suspense } from "react";
import Link from "next/link";
export default function Login() {
  return (
    <>
      <div className="shadow-lg flex flex-col bg-base-300 gap-10 items-center justify-center h-screen">
        <Suspense>
          <ClientFlashComponents />
        </Suspense>
        <div className="bg-white flex flex-col text-center justify-center rounded-lg w-96 shadow-lg shadow-indigo-500/50">
          <div>
            <DotLottieReact
              className="w-full h-full "
              src="https://lottie.host/04f3e53a-92bd-44ce-883d-7ee8ef73a39e/xQvUSM1fqO.json"
              loop
              autoplay
            />
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome Back
          </h2>
          <form className="p-8" action={handleFormAction} method="POST">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white p-2 rounded-md focus:outline-none focus:ring-2">
              Login
            </button>
          </form>
          <Link href="../register">
            <p className="p-2 mb-5 text-blue-300 text-sm font-extralight">
              Don't have an account ? <span className=" ">Sign Up</span>
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
