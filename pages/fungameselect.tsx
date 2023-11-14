import { useState } from "react";
import { DefaultButton, GridButton } from "../components/StyledButton";
import Topnav from "@/components/topnav";

const Fungameselect = () => {
  const [highlightedButton, setHighlightedButton] = useState("");
  const [textholder, settextholder] = useState("<Select a Game Mode>");

  return (
    <div>
      <Topnav />
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-2 gap-2">
          <div></div>

          <div className="text-white px-32">
            <p className="text-4xl underline text-center mb-4 ">
              Select Game Mode
            </p>
          </div>

          <div className="flex items-center justify-center ">
            <div className="text-white text-center">
              <p className="text-6xl underline">Play For Fun</p>
              <br></br>
              <p className="text-xl">
                The following game mode uses no Elo or Betting.<br></br>
                You will be paired with a random player.
              </p>
              <br></br>
              <p className="text-xl">
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
                <DefaultButton inserttext="Begin Game" link="/chessgame" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 col-start-2">
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
};

export default Fungameselect;
