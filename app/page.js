import HomePage from "@/components/HomePage";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      {/* Vercel performance monitoring */}
      <SpeedInsights />

      {/* Vercel analytics for user interactions */}
      <Analytics />

      {/* Suspense ensures HomePage loads smoothly with a fallback loader */}
      <Suspense fallback={<Loader />}>
        <HomePage />
      </Suspense>
    </>
  );
}