import Image from "next/image";
import StyledButton from "./StyledButton";

const Chessboard = () => {
  return (
    <section className="relative w-[700px] h-[700px]">
      <div className="text-center -translate-y-10">
        <StyledButton
          inserttext="Betting and Cheating Guideline"
          link="/chessgame"
          colour="bg-teal-500"
          hover="hover:bg-teal-700"
          textsize="text-4xl"
        />
      </div>

      <Image
        src="/StaticChessboard.png"
        alt="Chessboard"
        width={700}
        height={700}
      />

      <div className="flex flex-col items-center space-y-4 absolute inset-0 justify-center pt-[100px]">
        <StyledButton
          inserttext="Play for Money"
          link="/chessgame"
          colour="bg-teal-800/90"
          hover="hover:bg-teal-900"
          textsize="text-2xl"
        />
        <StyledButton
          inserttext="Play for Fun"
          link="/chessgame"
          colour="bg-teal-600/90"
          hover="hover:bg-teal-900"
          textsize="text-lg"
        />
      </div>
    </section>
  );
};

export default Chessboard;
