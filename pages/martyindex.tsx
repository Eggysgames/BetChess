import Image from "next/image";
import StyledLink from "../components/StyledLink";

const Index = () => {
  return (
    <div className="flex items-center justify-center h-screen">

      <section className="relative w-[700px] h-[700px]">

        <Image
          src="/StaticChessboard.png"
          alt="Chessboard"
          width={700}
          height={700}
        />

        <div className="absolute inset-0 flex items-center flex-col justify-center space-y-3 bg-black bg-opacity-70">
          <StyledLink href="/chessgame">Play for Money</StyledLink>
          <StyledLink href="/chessgame">Play for Fun</StyledLink>
        </div>
        
      </section>

    </div>
  );
};

export default Index;
