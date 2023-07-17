import Image from 'next/image';
import StyledButton from "../components/StyledButton";

const Index = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">

    <section className='relative w-[700px] h-[700px]'>

      <Image
        src="/StaticChessboard.png"
        alt="Chessboard"
        width={700}
        height={700}
      />

      <div className="flex flex-col items-center space-y-4 absolute inset-0 justify-center">
        <StyledButton inserttext="Play for Money" link="/chessgame" />
        <StyledButton inserttext="Play for Fun" link="/chessgame" />
      </div>

    </section>


    </div>
  );
};

export default Index;
