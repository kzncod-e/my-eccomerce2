"use client";
import ClientFlashComponents from "../components/ClientFlashComponents";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import * as motion from "framer-motion/client";
import { Suspense } from "react";
import Link from "next/link";
import handleFormAction from "../login/action";
export default function Register() {
  return (
    <>
      <div className="shadow-lg flex text-center flex-col gap-7 items-center justify-center h-screen">
        <Suspense>
          <ClientFlashComponents />
        </Suspense>
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],

            repeatDelay: 1,
          }}>
          <div className="bg-white rounded-lg w-96 shadow-lg shadow-indigo-500/50">
            <div>
              <DotLottieReact
                className="w-full h-full "
                src="https://lottie.host/04f3e53a-92bd-44ce-883d-7ee8ef73a39e/xQvUSM1fqO.json"
                loop
                autoplay
              />
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Registration Info
            </h2>
            <form action={handleFormAction} className="p-8" method="POST">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-6">
                <input
                  name="username"
                  type="text"
                  placeholder="username"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-6">
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-6">
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white p-2 rounded-md focus:outline-none focus:ring-2">
                SUBMIT
              </button>
            </form>
            <Link href="../login">
              <p className="p-2 mb-5 text-blue-300 text-sm font-extralight">
                Already have an Account ? <span className=" ">Sign In</span>
              </p>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
