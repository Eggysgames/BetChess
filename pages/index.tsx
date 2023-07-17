import Image from "next/image";
import Link from "next/link";

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
          <Link
            className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg text-2xl"
            href="/chessgame"
          >
            Play for Money
          </Link>

          <Link
            className="bg-teal-800/90 hover:bg-teal-950/90 text-white font-bold py-2 px-6 rounded-full border-none drop-shadow-lg text-2xl"
            href="/chessgame"
          >
            Play for Fun
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
