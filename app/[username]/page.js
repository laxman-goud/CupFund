import PaymentPage from "@/components/PaymentPage";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import React from "react";
import { fetchUser } from "@/action/useractions";

const Username = ({ params }) => {
  return (
    <>
    <Suspense fallback={<Loader/>}>
      <PaymentPage username={params.username}/>
    </Suspense>
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  const user = JSON.parse(await fetchUser(params.username));
  const userTitle = user.username ? `Support ${user.username} | Get Me A Chai` : "User Not Found | Get Me A Chai"

  return {
    title: userTitle,
  };
}
