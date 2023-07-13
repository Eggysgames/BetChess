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
      />
      
      <h1 className="absolute text-3xl underline text-white font-bold">
        <a href="./chessgame">PRESS ME TO PLAY CHESS!</a>
      </h1>



    </div>
  );
};

export default Index;