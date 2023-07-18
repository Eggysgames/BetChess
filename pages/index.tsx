import Image from 'next/image';
import StyledButton from "../components/StyledButton";

const Index = () => {
  return (
    <div className="relative flex items-center justify-center h-screen py-16">


    <section className='relative w-[700px] h-[700px]'>

    
      <div className='text-center -translate-y-6'>
        <StyledButton inserttext="Betting and Cheating Guideline" link="/chessgame" colour='bg-teal-600/80' hover='hover:bg-teal-900' textsize='text-4xl'/>
      </div>


      <Image
        src="/StaticChessboard.png"
        alt="Chessboard"
        width={700}
        height={700}
      />

      <div className="flex flex-col items-center space-y-4 absolute inset-0 justify-center">
        <StyledButton inserttext="Play for Money" link="/chessgame" colour='bg-teal-600/90' hover='hover:bg-teal-900' textsize='text-2xl'/>
        <StyledButton inserttext="Play for Fun" link="/chessgame" colour='bg-teal-600/90' hover='hover:bg-teal-900' textsize='text-2xl'/>
      </div>
    </section>


    </div>
  );
};

export default Index;
