import React from "react";

const About = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-gray-900 via-black to-black">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg md:text-xl text-gray-300 italic">
          &quot;Fueling Creativity, One Cup at a Time&quot;
        </p>
      </section>

      {/* Story Section */}
      <section className="px-6 md:px-16 py-14 max-w-5xl mx-auto space-y-12 text-center leading-relaxed">
        <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition">
          <p className="text-gray-300 text-lg">
            At <span className="font-semibold">CupFund</span>, we are
            committed to fostering a vibrant community where developers,
            creators, and influencers can thrive. Our crowdfunding platform
            connects talented individuals with supporters who believe in their
            vision and want to help bring their projects to life.
          </p>
        </div>
        <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition">
          <p className="text-gray-300 text-lg">
            Our mission is to empower developers, content creators, artists, and
            influencers by providing them with the resources they need to succeed.
            Whether you&apos;re building apps, making videos, creating art, or sharing
            your story, <span className="font-semibold">CupFund</span> is
            here to support you every step of the way.
          </p>
        </div>
        <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition">
          <p className="text-gray-300 text-lg">
            We believe in the transformative power of community support. Our
            platform is more than just crowdfunding – it&apos;s a space where{" "}
            <span className="font-semibold">dreams become reality</span> and ideas
            flourish.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-white h-1 opacity-10 my-12"></div>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Why Choose CupFund?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          We make it simple for creators to receive support, and for fans to
          contribute. Here’s what sets us apart:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition">
            <div className="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-indigo-600 text-white">
              🎨
            </div>
            <h3 className="mt-4 text-lg font-semibold">Easy Customization</h3>
            <p className="text-gray-400 mt-2">
              Personalize your campaign page’s look and feel to match your
              unique style.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition">
            <div className="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-yellow-500 text-white">
              ⚡
            </div>
            <h3 className="mt-4 text-lg font-semibold">High Performance</h3>
            <p className="text-gray-400 mt-2">
              Our platform is optimized for speed so your supporters never miss
              a chance to back you.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition">
            <div className="flex justify-center items-center h-12 w-12 mx-auto rounded-full bg-green-600 text-white">
              🛠️
            </div>
            <h3 className="mt-4 text-lg font-semibold">Comprehensive Tools</h3>
            <p className="text-gray-400 mt-2">
              From analytics to supporter engagement, everything you need to run
              a successful campaign.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About | CupFund",
};
