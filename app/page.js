export default function Home() {
  return (
    <>
      <div className="home flex flex-col items-center justify-center gap-2 h-[44vh] text-white">
        <h1 className="font-bold text-5xl flex justify-center items-center">Buy Me a Chai <span><img src="/tea.gif" alt="tea" width={88} /></span></h1>
        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
        <div>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
        </div>
        <p className="mt-4 text-lg text-center">Support your favorite creators by buying them a chai. Every contribution helps them continue doing what they love!</p>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="hero-1 text-white my-10">
        <h1 className="text-2xl font-bold text-center my-6">Your Fans can buy you a chai</h1>
        <div className="flex gap-5 justify-around items-center flex-wrap p-4">
          <div className="item space-y-3 flex flex-col items-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" src="/man.gif" alt="man" width={88} />
            <p className="font-bold">Fund yourself</p>
            <p>Start your journey and let your fans support your passion.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" alt="man" width={88} />
            <p className="font-bold">Receive instant support</p>
            <p>Get contributions instantly and keep creating amazing content.</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" src="/group.gif" alt="man" width={88} />
            <p className="font-bold">Grow your community</p>
            <p>Connect with your audience and build a loyal fanbase.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="hero-2 text-white py-5">
        <h1 className="text-2xl font-bold text-center my-4">Learn more about us</h1>
        <div className="flex justify-center items-center flex-col pb-1.5">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/7u6-hMqBoWo?si=Gl42B1l21qsH_sJ2"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}
