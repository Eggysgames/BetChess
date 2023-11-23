import Image from "next/image";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import Chessboard from "../components/Chessboard";
import { StyledButton, DefaultButton } from "../components/StyledButton";
import "animate.css";
import React, { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    setSession(sessionData?.session || null);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="lg:mt-16">
      <div className="lg:flex lg:flex-col lg:h-screen">
        <TopBar />

        <div className="lg:flex-grow lg:flex">
          {/* Left Column */}
          <div className="flex items-center justify-center w-11/12  flex-col space-y-5">
            <Image
              className="max-w-none lg:w-[400px] sm:max-w-none sm:w-[420px] 2xl:w-full lg:block w-[140px] ml-8 lg:ml-0"
              src="/horsedollar.png"
              alt="HorseIcon"
              width={640}
              height={480}
            />

            {session ? (
              <div className="lg:flex lg:items-center lg:justify-center lg:w-11/12 flex-col lg:whitespace-nowrap"></div>
            ) : (
              <div className="lg:ml-0 flex items-center justify-center lg:w-11/12 lg:flex-col lg:space-y-5 lg:whitespace-nowrap">
                <div className="ml-8 mr-1 lg:mr-0 lg:ml-0">
                  <DefaultButton inserttext="Log In" link="/login" />
                </div>
                <DefaultButton inserttext="Register" link="/register" />
              </div>
            )}
          </div>

          {/* Middle */}
          <div className="flex flex-grow items-center justify-center ">
            <div>
              <div className="text-center mb-4 mb-4 lg:mt-16 mt-4 lg:mt-0">
                <StyledButton
                  inserttext="Betting and Cheating Guideline"
                  link="/cheatingpolicy"
                  colour="bg-teal-500"
                  hover="hover:bg-teal-700"
                  textsize="text-2xl xl:text-4xl"
                />
              </div>

              <Chessboard />
            </div>
          </div>

          {/* Right Column*/}

          <div className="lg:flex lg:w-11/12 lg:flex-col text-white text-5xl items-start font-bold lg:mt-48 mt-8 p-2 text-left ml-16">
            Play Chess, Win Money.
            <br />
            <br />
            <div className="flex items-start w-full">
              <div className="p-0.5">
                <Image
                  src="/pawn.svg"
                  alt="PawnIcon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
              </div>
              <p className="not-bold-not-underlined font-normal underline-none text-2xl w-full">
                Play similar ELO rated opponents
              </p>
            </div>
            <div className="flex items-start w-full">
              <div className="p-0.5">
                <Image
                  src="/pawn.svg"
                  alt="PawnIcon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
              </div>
              <p className="not-bold-not-underlined font-normal underline-none text-2xl w-full">
                Odds to Play Higher Rated Players
              </p>
            </div>
            <div className="flex items-start w-full">
              <div className="p-0.5">
                <Image
                  src="/pawn.svg"
                  alt="PawnIcon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
              </div>
              <p className="not-bold-not-underlined font-normal underline-none text-2xl w-full">
                Prop Bets
              </p>
            </div>
            <div className="flex items-start w-full">
              <div className="p-0.5">
                <Image
                  src="/pawn.svg"
                  alt="PawnIcon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
              </div>
              <p className="not-bold-not-underlined font-normal underline-none text-2xl w-full">
                Tournaments
              </p>
            </div>
            <div className="flex items-start w-full">
              <div className="p-0.5">
                <Image
                  src="/pawn.svg"
                  alt="PawnIcon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
              </div>
              <p className="not-bold-not-underlined font-normal underline-none text-2xl w-full">
                Free Rolls
              </p>
            </div>
            <div className="flex items-start w-full">
              <div className="p-0.5">
                <Image
                  src="/pawn.svg"
                  alt="PawnIcon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
              </div>
              <p className="not-bold-not-underlined font-normal underline-none text-2xl w-full">
                Strict No-Cheating Policy
              </p>
            </div>
          </div>
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Index;
