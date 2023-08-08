import { useState } from "react";
import GridButtonSet from "../components/GridButtonSet";
import { DefaultButton } from "../components/StyledButton";

const Gameselect = () => {
  const [betSelection, setBetSelection] = useState("");
  const [gameSelection, setGameSelection] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-x-2">
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
          <div className="border-b border-white pb-8 mb-8">
            <p className="text-4xl underline text-center mb-4 ">
              Select Bet and Game
            </p>

            <GridButtonSet
              value={betSelection}
              onChange={setBetSelection}
              options={[
                { key: "1", line1: "$1.50" },
                { key: "2", line1: "$1.50" },
                { key: "3", line1: "$5" },
                { key: "4", line1: "$10" },
                { key: "5", line1: "$20" },
                { key: "6", line1: "$50" },
                { key: "7", line1: "Car" },
                { key: "8", line1: "Boat" },
                { key: "9", line1: "Wife" },
              ]}
            />
          </div>
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
          <DefaultButton inserttext="Begin Game" link="/chessgame" />
        </div>

        <div className="px-32">
          <GridButtonSet
            value={gameSelection}
            onChange={setGameSelection}
            options={[
              { key: "1", line1: "Blitz", line2: "3+2" },
              { key: "2", line1: "Blitz", line2: "5+0" },
              { key: "3", line1: "Blitz", line2: "5+3" },
              { key: "4", line1: "Rapid", line2: "10+0" },
              { key: "5", line1: "Rapid", line2: "10+5" },
              { key: "6", line1: "Rapid", line2: "15+10" },
              { key: "7", line1: "Classical", line2: "20+10" },
              { key: "8", line1: "Classical", line2: "30+0" },
              { key: "9", line1: "Classical", line2: "60+0" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Gameselect;
