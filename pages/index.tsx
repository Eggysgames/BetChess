import React from 'react';
import Image from 'next/image';

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
        <button className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg text-2xl">
          <a href="./chessgame">Play for Money</a>
        </button>

        <button className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg text-2xl">
          <a href="./chessgame">Play for Fun</a>
        </button> 
      </div>

    </section>


    </div>
  );
};

export default Index;
