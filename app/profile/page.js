import React from 'react';
import DashBoard from '@/components/DashBoard';
import Loader from '@/components/Loader';
import { Suspense } from 'react';

const Profile = () => {
  return (
    <>
      {/* Suspense ensures dashboard loads smoothly with a loader */}
      <Suspense fallback={<Loader />}>
        <DashBoard />    {/* Dashboard component containing user settings */}
      </Suspense>
    </>
  );
};

export default Profile;

// Metadata for SEO and browser tab title
export const metadata = {
  title: "Profile | CupFund",
};