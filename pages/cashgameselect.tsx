import { useState, useEffect } from "react";
import { DefaultButton, GridButton } from "../components/StyledButton";
import Topnav from "@/components/topnav";
import { createClient, Session } from "@supabase/supabase-js";
import BottomBar from "@/components/BottomBar";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Gameselect = () => {
  const [highlightedButton, setHighlightedButton] = useState("");
  const [highlightedButton2, setHighlightedButton2] = useState("");
  const [textholder, settextholder] = useState("<Select a Bet Amount>");
  const [textholder2, settextholder2] = useState("<Select a Game Mode");
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const { data: sessionData, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error.message);
    } else {
      setSession(sessionData?.session || null);
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false)); // Set loading to false when data is fetched
  }, []);

  if (session) {
    return (
      <div>
        <div className="lg:flex lg:justify-center lg:items-center lg:h-screen mt-20 p-6">
          <div className="lg:grid lg:grid-cols-2 gap-2">
            <div className="flex items-center justify-center">
              <div className="text-white text-center">
                <p className="lg:text-6xl text-3xl underline mt-4 lg:mt-0">
                  Betting Guidelines
                </p>
                <br></br>
                <p className="lg:text-xl">
                  Select Betting amount and then select game. <br></br>
                  Note : If you choose wife, she will be immediately kidnapped
                  until end of game.
                </p>
                <p className="lg:text-xl">
                  Once a game has begun after the 2nd move, bets are locked in.{" "}
                </p>
                <p className="lg:text-xl">
                  Make sure you choose carefully before pressing begin game
                </p>
                <br></br>

                <br></br>
              </div>
            </div>

            <div className="text-white lg:px-32">
              <p className="lg:text-4xl underline text-center mb-4 ">
                Select Bet and Game
              </p>

              <div className="grid grid-cols-3 gap-2">
                <GridButton
                  inserttext="$1.50"
                  highlighted={highlightedButton === "1"}
                  onClick={(text) => {
                    setHighlightedButton("1");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="$2.50"
                  highlighted={highlightedButton === "2"}
                  onClick={(text) => {
                    setHighlightedButton("2");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="$5"
                  highlighted={highlightedButton === "3"}
                  onClick={(text) => {
                    setHighlightedButton("3");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="$10"
                  highlighted={highlightedButton === "4"}
                  onClick={(text) => {
                    setHighlightedButton("4");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="$5"
                  highlighted={highlightedButton === "5"}
                  onClick={(text) => {
                    setHighlightedButton("5");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="$20"
                  highlighted={highlightedButton === "6"}
                  onClick={(text) => {
                    setHighlightedButton("6");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="Car"
                  highlighted={highlightedButton === "7"}
                  onClick={(text) => {
                    setHighlightedButton("7");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="Boat"
                  highlighted={highlightedButton === "8"}
                  onClick={(text) => {
                    setHighlightedButton("8");
                    settextholder(text);
                  }}
                />

                <GridButton
                  inserttext="Wife"
                  highlighted={highlightedButton === "9"}
                  onClick={(text) => {
                    setHighlightedButton("9");
                    settextholder(text);
                  }}
                />
              </div>

              <br></br>
              <hr />
            </div>

            <div className="text-white text-center">
              <p className="lg:text-6xl text-3xl underline mt-4 lg:mt-0">
                ELO Max Bets
              </p>
              <br></br>
              <p className="lg:text-2xl">Under 1000 - Max Bet $5</p>
              <p className="lg:text-2xl">Under 1001 - 1200 - Max Bet $10</p>
              <p className="lg:text-2xl">Under 1201 - 1500 - Max Bet $15</p>
              <p className="lg:text-2xl">1501+ - Max Bet $20</p>
              <br></br>
              <br></br>

              <div className="lg:text-2xl">
                Selected Bet -{" "}
                <p className="text-blue-300 inline-block">{textholder}</p>
                <br></br>
                Selected Game -{" "}
                <p className="text-red-600 inline-block">{textholder2}</p>
              </div>

              <br></br>
              <br></br>

              {highlightedButton !== "" && highlightedButton2 !== "" && (
                <DefaultButton inserttext="Begin Game" link="/chessgame" />
              )}
            </div>

            <div className="lg:px-32 my-10 grid grid-cols-3 gap-2 col-start-2">
              <GridButton
                inserttext="Blitz"
                inserttext2="3+2"
                highlighted={highlightedButton2 === "1"}
                onClick={(text) => {
                  setHighlightedButton2("1");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Blitz"
                inserttext2="5+0"
                highlighted={highlightedButton2 === "2"}
                onClick={(text) => {
                  setHighlightedButton2("2");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Blitz"
                inserttext2="5+3"
                highlighted={highlightedButton2 === "3"}
                onClick={(text) => {
                  setHighlightedButton2("3");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Rapid"
                inserttext2="10+0"
                highlighted={highlightedButton2 === "4"}
                onClick={(text) => {
                  setHighlightedButton2("4");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Rapid"
                inserttext2="10+5"
                highlighted={highlightedButton2 === "5"}
                onClick={(text) => {
                  setHighlightedButton2("5");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Rapid"
                inserttext2="15+10"
                highlighted={highlightedButton2 === "6"}
                onClick={(text) => {
                  setHighlightedButton2("6");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Classical"
                inserttext2="20+0"
                highlighted={highlightedButton2 === "7"}
                onClick={(text) => {
                  setHighlightedButton2("7");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Classical"
                inserttext2="30+0"
                highlighted={highlightedButton2 === "8"}
                onClick={(text) => {
                  setHighlightedButton2("8");
                  settextholder2(text);
                }}
              />

              <GridButton
                inserttext="Classical"
                inserttext2="60+0"
                highlighted={highlightedButton2 === "9"}
                onClick={(text) => {
                  setHighlightedButton2("9");
                  settextholder2(text);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!session) {
    return (
      <div>
        <div className="text-white font-bold  text-center lg:flex lg:flex-col items-center shadow-lg rounded-3xl bg-slate-800 lg:mb-5 lg:h-[250px] p-6  mt-32 lg:w-2/5 w-4/5 mx-auto">
          <div className="lg:mt-24 text-2xl">
            You need to be logged in to play a game
          </div>
        </div>

        <BottomBar />
      </div>
    );
  }
};

export default Gameselect;
