import Image from "next/image";
import BottomBar from "../components/BottomBar";
import Chessboard from "../components/Chessboard";
import TopBar from "../components/TopBar";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />

      <div className="flex-grow flex">
        {/* Left Column */}
        <div className="flex items-center justify-end border border-purple-600 w-80">
          <Image
            className="border border-red-300"
            src="/horsedollar.png"
            alt="HorseIcon"
            width={200}
            height={500}
          />
        </div>

        {/* Middle */}
        <div className="flex flex-grow border border-yellow-500 items-center justify-center">
          <Chessboard />
        </div>

        {/* Right Column*/}
        <div className="w-80 border border-purple-600">Right column here</div>
      </div>

      <BottomBar />
    </div>
  );
};

export default Index;
