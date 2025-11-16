"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();        // Current logged-in user session
  const router = useRouter();                    // Router for redirection

  useEffect(() => {
    document.title = `Login | CupFund`;          // Set page title

    if (session) {
      router.push("/profile");                   // Redirect user if already logged in
    }
  }, [router, session]);

  // List of authentication providers shown on UI
  const providers = [
    {
      name: "Google",
      action: () => signIn("google"),            // Trigger Google OAuth login
      icon: (
        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.64 1.22 9.1 3.6l6.8-6.8C35.5 2.6 30.2 0 24 0 14.6 0 6.5 5.5 2.5 13.5l7.9 6.2C12 13 17.6 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.5 2.5-1.9 4.6-3.9 6.1l6.1 4.7c3.6-3.3 5.3-8.1 5.3-15.3z"/>
          <path fill="#FBBC05" d="M10.4 28.7c-1-2.5-1.6-5.2-1.6-8.2s.6-5.7 1.6-8.2l-7.9-6.2C.9 10.7 0 14.2 0 18c0 3.8.9 7.3 2.5 10.5l7.9-6.2z"/>
          <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.3-5.7c-2.1 1.4-4.8 2.2-8.5 2.2-6.4 0-12-4.3-14-10.1l-7.9 6.2C6.5 42.5 14.6 48 24 48z"/>
        </svg>
      ),
      disabled: false,
    },
    {
      name: "GitHub",
      action: () => signIn("github"),            // Trigger GitHub OAuth login
      icon: (
        <svg className="h-5 w-5 mr-2 invert" viewBox="0 0 24 24" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9..."
          />
        </svg>
      ),
      disabled: false,
    },

    // Other providers not implemented yet
    { name: "LinkedIn", disabled: true },
    { name: "Twitter", disabled: true },
    { name: "Facebook", disabled: true },
    { name: "Apple", disabled: true },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-gray-900 text-white px-4">
      
      {/* Login Card */}
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        
        <h1 className="font-bold text-2xl md:text-3xl mb-6">
          Login / Signup to Get Started
        </h1>

        {/* Authentication Provider Buttons */}
        <div className="flex flex-col gap-3">
          {providers.map((p, i) => (
            <button
              key={i}
              onClick={p.disabled ? undefined : p.action}  // Prevent click if disabled
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