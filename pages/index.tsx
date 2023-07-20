import Image from "next/image";
import Chessboard from "../components/Chessboard";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      {/*Div 1 (left)*/}

      <div className="border border-purple-600 fixed top-48">
        <div className="text-3xl font-bold border border-purple-100">
          <h1 className="text-white pl-6 pt-6">betonchess.online</h1>
          <h1 className="text-white pl-6">betchess.online</h1>
        </div>

        <Image
          className="border border-purple-200"
          src="/horsedollar.png"
          alt="HorseIcon"
          width={500}
          height={500}
        />
      </div>

      {/*Div 5 (Middle div)*/}
      <div className="relative flex items-center justify-center flex-grow py-16">
        <Chessboard />
      </div>
    </div>
  );
};

export default Index;
