import { useState } from "react";
import { DefaultButton, GridButton } from "../components/StyledButton";

const Gameselect = () => {
  const [highlightedButton, setHighlightedButton] = useState("");
  const [highlightedButton2, setHighlightedButton2] = useState("");
  const [textholder, settextholder] = useState("<Select a Bet Amount>");
  const [textholder2, settextholder2] = useState("<Select a Game Mode");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-6xl underline">Betting Guidelines</p>
            <br></br>
            <p className="text-xl">
              Select Betting amount and then select game. <br></br>
              Note : If you choose wife, she will be immediately kidnapped until
              end of game.
            </p>
            <p className="text-xl">
              Once a game has begun after the 2nd move, bets are locked in.{" "}
            </p>
            <p className="text-xl">
              Make sure you choose carefully before pressing begin game
            </p>
            <br></br>
            <p className="text-xl">We are not liable for angry wives.</p>
            <br></br>
            <br></br>
          </div>
        </div>

        <div className="text-white px-32">
          <p className="text-4xl underline text-center mb-4 ">
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
          <p className="text-6xl underline">ELO Max Bets</p>
          <br></br>
          <p className="text-2xl">Under 1000 - Max Bet $5</p>
          <p className="text-2xl">Under 1001 - 1200 - Max Bet $10</p>
          <p className="text-2xl">Under 1201 - 1500 - Max Bet $15</p>
          <p className="text-2xl">1501+ - Max Bet $20</p>
          <br></br>
          <br></br>

          <div className="text-2xl">
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

        <div className="px-32 my-10 grid grid-cols-3 gap-2 col-start-2">
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
  );
};

export default Gameselect;
