import React from 'react';
import Image from 'next/image';

const Index = () => {


  return (
    <div className="relative flex items-center justify-center h-screen">

      <Image
        src="/StaticChessboard.png"
        alt="Chessboard"
        width={700}
        height={700}
        className=""
      />

      <button className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg position: absolute font text-2xl">
        <a href="./chessgame">Play for Money</a>
      </button>



    </div>
  );
};

export default Index;