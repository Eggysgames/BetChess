import Image from "next/image";
import BottomBar from "../components/BottomBar";
import Chessboard from "../components/Chessboard";
import { StyledButton, DefaultButton } from "../components/StyledButton";
import TopBar from "../components/TopBar";

const Index = () => {
  return (
    <div className="flex flex-col h-screen ">
      <TopBar />

      <div className="flex-grow flex">
        {/* Left Column */}
        <div className="flex items-center justify-center w-11/12  flex-col space-y-5">
          <Image
            src="/horsedollar.png"
            alt="HorseIcon"
            width={500}
            height={700}
          />

          <DefaultButton inserttext="Sign Up" link="/chessgame"/>
          
          <DefaultButton inserttext="Log In" link="/chessgame"/>

        </div>

        {/* Middle */}
        <div className="flex flex-grow  items-center justify-center ">
          <div>
            <div className="text-center mb-8">
              <StyledButton
                inserttext="Betting and Cheating Guideline"
                link="/chessgame"
                colour="bg-teal-500"
                hover="hover:bg-teal-700"
                textsize="text-4xl"
              />
            </div>

            <Chessboard />
          </div>
        </div>

        {/* Right Column*/}

      <div className="flex w-11/12 flex-col text-white text-5xl items-start items-center font-bold mt-48">
        Play Chess, Win Money.
        <br />
        <br />

        <div className="flex items-center">
          <Image
            src="/pawn.svg"
            alt="PawnIcon"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="not-bold-not-underlined font-normal underline-none text-2xl">
            Play similar ELO rated opponents
          </p>
        </div>

        <div className="flex items-center">
          <Image
            src="/pawn.svg"
            alt="PawnIcon"
            width={30}
            height={30}
            className="mr-2"
          />
        <p className="not-bold-not-underlined font-normal underline-none text-2xl">
          Odds to Play Higher Rated Players
        </p>
      </div>

        <div className="flex items-center">
          <Image
            src="/pawn.svg"
            alt="PawnIcon"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="not-bold-not-underlined font-normal underline-none text-2xl">
            Prop Bets
          </p>
        </div>

        <div className="flex items-center">
          <Image
            src="/pawn.svg"
            alt="PawnIcon"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="not-bold-not-underlined font-normal underline-none text-2xl">
            Tournaments
          </p>
        </div>

        <div className="flex items-center">
          <Image
            src="/pawn.svg"
            alt="PawnIcon"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="not-bold-not-underlined font-normal underline-none text-2xl">
            Free Rolls
          </p>
        </div>

        <div className="flex items-center">
          <Image
            src="/pawn.svg"
            alt="PawnIcon"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="not-bold-not-underlined font-normal underline-none text-2xl">
            Strict No-Cheating Policy
          </p>
        </div>
      </div>

      

      </div>

      <BottomBar />

    </div>
  );
};

export default Index;