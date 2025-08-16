import Image from "next/image";

export default function Home() {
  return (
    <div className="home flex flex-col items-center justify-center h-[44vh] text-white">
      <h1 className="font-bold text-3xl">Buy Me a Chai</h1>
      <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
      <div>
        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
      </div>
    </div>
  );
}
