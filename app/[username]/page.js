import PaymentPage from "@/components/PaymentPage";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import React from "react";
import { fetchUser } from "@/action/useractions";

// Dynamic route component for: /username
// This page loads the donation/payment UI for a specific creator
const Username = ({ params }) => {
  return (
    <>
      {/* Suspense used to show a loader while PaymentPage fetches user/payment data */}
      <Suspense fallback={<Loader />}>
        {/* Pass the dynamic username to PaymentPage */}
        <PaymentPage username={params.username} />
      </Suspense>
    </>
  );
};

export default Username;

// This function dynamically sets the page <title> based on the user visited
export async function generateMetadata({ params }) {
  
  // Fetch user details (server-side) using the username from the URL
  const user = JSON.parse(await fetchUser(params.username));

  const userTitle = user.username
    ? `Support ${user.username} | CupFund`
    : "User Not Found | CupFund";

  return {
    title: userTitle,
  };
}
