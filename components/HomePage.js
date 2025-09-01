/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100dvh] gap-10">
        <div className="font-bold text-4xl md:text-6xl flex items-end justify-center gap-0">
          <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent">
            Get Me A Chai{" "}
          </span>
          <span>
            <img
              src="/tea.gif"
              alt="Chai cup"
              className="bg-blend-luminosity w-[62px] md:w-[70px] mb-[-7px]"
            />
          </span>
        </div>
        <p className="px-5 text-center text-lg font-bold">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start your creative journey now!
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" passHref legacyBehavior>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Here
            </button>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10" />

      <div className="text-white container mx-auto py-14 px-10 md:px-0">
        <h2 className="text-2xl text-center font-bold mb-14">
          Your fans can buy you a chai
        </h2>
        <div className="flex gap-5 justify-around flex-wrap">
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/man.gif"
              alt="Creator working"
              className="bg-slate-400 rounded-full w-[82px] md:w-[90px]"
            />
            <p className="font-bold">Fund Your Passion</p>
            <p>Let your fans support your creative journey and help you grow.</p>
          </div>
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/dollar.gif"
              alt="Financial support"
              className="bg-slate-400 rounded-full w-[82px] md:w-[90px]"
            />
            <p className="font-bold">Receive Support</p>
            <p>Get direct contributions from your audience for your projects.</p>
          </div>
          <div className="space-y-4 flex flex-col items-center text-center max-w-xs">
            <img
              src="/group.gif"
              alt="Community"
              className="bg-slate-400 rounded-full w-[82px] md:w-[90px]"
            />
            <p className="font-bold">Build Your Community</p>
            <p>Connect with fans who believe in your work and want to help.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10" />

      <div className="text-white container py-14 mx-auto">
        <h2 className="text-2xl text-center font-bold mb-14">
          Learn More About Us
        </h2>
        <div className="px-1 md:px-5 mt-20">
          <p className="p-4 text-gray-200 text-md text-center font-sans">
            At Get Me A Chai, we empower creators, developers, and influencers by connecting them with their supporters. Our platform enables you to fund your projects and ideas, providing a space where creativity and innovation thrive.
          </p>
          <p className="p-4 text-gray-200 text-md text-center font-sans">
            Our mission is to help talented individuals focus on what they do best – creating. Whether you're coding the next big app, making engaging videos, or sharing your passion, Get Me A Chai is here to help you achieve your goals.
          </p>
          <p className="p-4 text-gray-200 text-md text-center font-sans">
            We believe in the power of community and collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
