import { useState, useEffect } from "react";
import { DefaultButton, GridButton } from "../components/StyledButton";
import Topnav from "@/components/topnav";
import { createClient, Session } from "@supabase/supabase-js";
import BottomBar from "@/components/BottomBar";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Fungameselect = () => {
  const [highlightedButton, setHighlightedButton] = useState("");
  const [textholder, settextholder] = useState("<Select a Game Mode>");
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
        <Topnav />
        <div className="lg:flex lg:justify-center lg:items-center lg:h-screen mt-32 lg:mt-0 mb-16 lg:mb-0">
          <div className="lg:grid lg:grid-cols-2 gap-2">
            <div></div>

            <div className="text-white lg:px-32">
              <p className="text-4xl underline text-center mb-4 hidden lg:block">
                Select Game Mode
              </p>
            </div>

            <div className="flex items-center justify-center ">
              <div className="text-white text-center">
                <p className="lg:text-6xl text-4xl underline">Play For Fun</p>
                <br></br>
                <p className="lg:text-xl">
                  The following game mode uses no Elo or Betting.<br></br>
                  You will be paired with a random player.
                </p>
                <br></br>
                <p className="lg:text-xl">
                  Have fun and treat each other with respect!
                </p>
                <br></br>
                <br></br>
                <p className="inline-block text-2xl">Selected Game - </p>{" "}
                <p className="text-blue-300 inline-block text-2xl">
                  {textholder}
                </p>
                <br></br>
                <br></br>
                {highlightedButton !== "" && (
                  <DefaultButton inserttext="Begin Game" link="/botgame" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 col-start-2 mr-2 ml-2 mt-6">
              <GridButton
                inserttext="Bullet"
                inserttext2="1+0"
                highlighted={highlightedButton === "1"}
                onClick={(text) => {
                  setHighlightedButton("1");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Bullet"
                inserttext2="2+0"
                highlighted={highlightedButton === "2"}
                onClick={(text) => {
                  setHighlightedButton("2");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Bullet"
                inserttext2="3+0"
                highlighted={highlightedButton === "3"}
                onClick={(text) => {
                  setHighlightedButton("3");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Blitz"
                inserttext2="3+2"
                highlighted={highlightedButton === "4"}
                onClick={(text) => {
                  setHighlightedButton("4");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Blitz"
                inserttext2="5+0"
                highlighted={highlightedButton === "5"}
                onClick={(text) => {
                  setHighlightedButton("5");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Blitz"
                inserttext2="5+3"
                highlighted={highlightedButton === "6"}
                onClick={(text) => {
                  setHighlightedButton("6");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Rapid"
                inserttext2="10+0"
                highlighted={highlightedButton === "7"}
                onClick={(text) => {
                  setHighlightedButton("7");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Rapid"
                inserttext2="10+5"
                highlighted={highlightedButton === "8"}
                onClick={(text) => {
                  setHighlightedButton("8");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Rapid"
                inserttext2="15+10"
                highlighted={highlightedButton === "9"}
                onClick={(text) => {
                  setHighlightedButton("9");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Classical"
                inserttext2="20+0"
                highlighted={highlightedButton === "10"}
                onClick={(text) => {
                  setHighlightedButton("10");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Classical"
                inserttext2="30+0"
                highlighted={highlightedButton === "11"}
                onClick={(text) => {
                  setHighlightedButton("11");
                  settextholder(text);
                }}
              />

              <GridButton
                inserttext="Classical"
                inserttext2="60+0"
                highlighted={highlightedButton === "12"}
                onClick={(text) => {
                  setHighlightedButton("12");
                  settextholder(text);
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

export default Fungameselect;
