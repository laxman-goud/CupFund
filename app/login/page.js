"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = `Login | Get Me A Chai`;
    if (session) {
      router.push("/profile");
    }
  }, [router, session]);

  const providers = [
    {
      name: "Google",
      action: () => signIn("google"),
      icon: (
        <svg
          className="h-5 w-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.64 1.22 9.1 3.6l6.8-6.8C35.5 2.6 30.2 0 24 0 14.6 0 6.5 5.5 2.5 13.5l7.9 6.2C12 13 17.6 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.5 2.5-1.9 4.6-3.9 6.1l6.1 4.7c3.6-3.3 5.3-8.1 5.3-15.3z"
          />
          <path
            fill="#FBBC05"
            d="M10.4 28.7c-1-2.5-1.6-5.2-1.6-8.2s.6-5.7 1.6-8.2l-7.9-6.2C.9 10.7 0 14.2 0 18c0 3.8.9 7.3 2.5 10.5l7.9-6.2z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.3-5.7c-2.1 1.4-4.8 2.2-8.5 2.2-6.4 0-12-4.3-14-10.1l-7.9 6.2C6.5 42.5 14.6 48 24 48z"
          />
        </svg>
      ),
      disabled: false,
    },
    {
      name: "GitHub",
      action: () => signIn("github"),
      icon: (
        <svg
          className="h-5 w-5 mr-2 invert"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 1.6.8 1.6-.5 1-1.8.7-1.8.7-.4-.8-1.4-.9-1.4-.9-.9.1-.6.9-.6.9.4.9 1.4 1.2 1.4 1.2 1.4.5 2.8.4 3.5-.1.1-.6.5-1 .9-1.3-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.5 1.3 1-.3 2.1-.5 3.2-.5 1.1 0 2.2.2 3.2.5 2.5-1.6 3.5-1.3 3.5-1.3.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.4 0 4.6-2.8 5.6-5.5 5.9.4.3.8.8.9 1.6v2.4c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9 0-6.4-5.1-11.5-11.5-11.5z"
          />
        </svg>
      ),
      disabled: false,
    },
    { name: "LinkedIn", disabled: true },
    { name: "Twitter", disabled: true },
    { name: "Facebook", disabled: true },
    { name: "Apple", disabled: true },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="font-bold text-2xl md:text-3xl mb-6">
          Login / Signup to Get Started
        </h1>

        <div className="flex flex-col gap-3">
          {providers.map((p, i) => (
            <button
              key={i}
              onClick={p.disabled ? undefined : p.action}
              disabled={p.disabled}
              className={`flex items-center justify-center w-full border rounded-lg px-6 py-3 text-sm font-medium shadow-md transition ${
                p.disabled
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-50 text-black hover:bg-gray-200"
              }`}
            >
              {p.icon}
              <span>Continue with {p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
