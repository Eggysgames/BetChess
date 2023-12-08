import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);

  let mover = false;

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      setConversation([...conversation, inputText]);
      setInputText("");
    }
  };

  function makeAMove(move: any) {
    if (!game.isDraw()) {
      try {
        game.move(move);
        if (mover == false) {
          setTimeout(makeRandomMove, 200);
          mover = true;
        }
      } catch {
        console.log("Invalid Move");
      }

      const newGame = new Chess(game.fen());
      setGame(newGame);
    }

    if (game.isCheckmate()) {
      setTimeout(() => {
        window.alert("Checkmate");
      }, 200);
    }

    if (game.isDraw()) {
      setTimeout(() => {
        window.alert("Draw");
      }, 200);
    }
  }

  function makeRandomMove(move: any) {
    const possibleMoves = game.moves();
    if (game.isCheckmate() || game.isDraw() || possibleMoves.length === 0) {
      console.log(game.isCheckmate());
      console.log(game.isDraw());
      return; // exit if the game is over
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function AI() {}

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for simplicity
    });

    // illegal move
    if (move === null) {
      return false;
    }

    return true;
  }

  return (
    <div>
      <div className="flex justify-left items-center ml-[15%]">
        <div className="flex flex-col items-center w-[740px] mt-32">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            areArrowsAllowed={true}
          />
        </div>

        <div className="shadow-md drop-shadow-xl rounded-3xl bg-slate-800 mb-5 h-[650px] w-[550px] ml-16 mt-32 flex flex-col">
          <div className="m-4 flex-1 overflow-y-auto">
            {conversation.map((message, index) => (
              <p key={index} className="text-white text-left">
                {message}
              </p>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between mt-4">
            <input
              className="rounded-3xl bg-slate-600 p-2 mb-8 w-[500px] text-white"
              type="text"
              placeholder="Aa"
              value={inputText}
              onChange={handleInputChange}
              onKeyUp={handleEnterPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
