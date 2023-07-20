import Image from 'next/image';
import StyledButton from "../components/StyledButton";

const Index = () => {
  return (

  <div className='flex flex-col h-screen'> 

    {/*Div 1 (left)*/}


    <div className='border border-purple-600 fixed top-48'>

      <div className='text-3xl font-bold border border-purple-100'>
        <h1 className="text-white pl-6 pt-6">betonchess.online</h1>
        <h1 className="text-white pl-6">betchess.online</h1>
      </div>

      <Image className="border border-purple-200"
        src="/horsedollar.png"
        alt="HorseIcon"
        width={500}
        height={500}
      />
    </div>


    {/*Div 5 (Middle div)*/}
    <div className="relative flex items-center justify-center flex-grow py-16">

      <section className='relative w-[700px] h-[800px]'>

        <div className='text-center -translate-y-10'>
          <StyledButton inserttext="Betting and Cheating Guideline" link="/chessgame" colour='bg-teal-500' hover='hover:bg-teal-700' textsize='text-4xl'/>
        </div>

        <Image
          src="/StaticChessboard.png"
          alt="Chessboard"
          width={700}
          height={700}
        />

        <div className="flex flex-col items-center space-y-4 absolute inset-0 justify-center">
          <StyledButton inserttext="Play for Money" link="/chessgame" colour='bg-teal-800/90' hover='hover:bg-teal-900' textsize='text-2xl'/>
          <StyledButton inserttext="Play for Fun" link="/chessgame" colour='bg-teal-600/90' hover='hover:bg-teal-900' textsize='text-lg'/>
        </div>
      </section>
    </div>

  </div>
  );
};

export default Index;
