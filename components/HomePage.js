/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      {/* =========================== */}
      {/*       HERO SECTION          */}
      {/* =========================== */}
      <section className="flex flex-col justify-center items-center h-[100dvh] text-center px-6 md:px-0 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        
        {/* Logo & Title */}
        <div className="font-bold text-4xl md:text-6xl flex items-end justify-center gap-2">
          {/* Gradient Text */}
          <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            CupFund
          </span>

          {/* Animated GIF Logo */}
          <img
            src="/tea.gif"
            alt="Chai cup"
            className="w-[62px] md:w-[70px] mb-[-7px] invert"
          />
        </div>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start your creative journey today!
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          {/* Login Button */}
          <Link href="/login" passHref legacyBehavior>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 transition font-medium text-white text-sm md:text-base">
              Start Here
            </button>
          </Link>

          {/* About Page Button */}
          <Link href="/about" passHref legacyBehavior>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition font-medium text-white text-sm md:text-base">
              Read More
            </button>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-white h-[1px] opacity-10" />

      {/* =========================== */}
      {/*      FEATURES SECTION       */}
      {/* =========================== */}
      <section className="text-white container mx-auto py-20 px-6">
        <h2 className="text-3xl text-center font-bold mb-14">
          Your fans can buy you a cup of chai ☕
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {/* Feature 1 */}
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/man.gif"
              alt="Creator working"
              className="bg-slate-400 rounded-full w-[82px] md:w-[90px]"
            />
            <h3 className="font-bold text-lg">Fund Your Passion</h3>
            <p className="text-gray-300">
              Let your fans support your creative journey and help you grow.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/coin.gif"
              alt="Financial support"
              className="bg-slate-400 rounded-full w-[82px] md:w-[90px]"
            />
            <h3 className="font-bold text-lg">Receive Support</h3>
            <p className="text-gray-300">
              Get direct contributions from your audience for your projects.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/group.gif"
              alt="Community"
              className="bg-slate-400 rounded-full w-[82px] md:w-[90px]"
            />
            <h3 className="font-bold text-lg">Build Your Community</h3>
            <p className="text-gray-300">
              Connect with fans who believe in your work and want to help.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-white h-[1px] opacity-10" />

      {/* =========================== */}
      {/*        ABOUT SECTION        */}
      {/* =========================== */}
      <section className="text-white container mx-auto py-20 px-6">
        <h2 className="text-3xl text-center font-bold mb-14">
          Learn More About Us
        </h2>

        {/* Two-column layout: Image + Text */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left → Image */}
          <div className="flex justify-center">
            <img
              src="about-left.jpg" // Replace with your image
              alt="About CupFund"
              className="rounded-xl shadow-lg w-full h-auto object-cover max-h-[400px]"
            />
          </div>

          {/* Right → Text Content */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              At <span className="font-semibold">CupFund</span>, we empower
              creators, developers, and influencers by connecting them with their
              supporters. Our platform enables you to fund your projects and ideas,
              providing a space where creativity and innovation thrive.
            </p>

            {/* Small highlight points with icons */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-green-500 p-2 rounded-full">✅</span>
                <p className="text-gray-300">
                  Focus on your passion while we help you build your community.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-blue-500 p-2 rounded-full">🚀</span>
                <p className="text-gray-300">
                  Launch creative ideas with support from your fans & followers.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="bg-purple-500 p-2 rounded-full">🤝</span>
                <p className="text-gray-300">
                  Turn dreams into reality through collective support.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
};

export default HomePage;