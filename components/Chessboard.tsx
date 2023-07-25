import Image from "next/image";
import StyledButton from "./StyledButton";

const Chessboard = () => {
  return (
    <section className="relative animate__animated animate__bounceInLeft">
      <Image
        src="/StaticChessboard.png"
        alt="Chessboard"
        width={2000}
        height={2000}
      />

      <div className="flex flex-col items-center space-y-4 absolute inset-0 justify-center ">
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