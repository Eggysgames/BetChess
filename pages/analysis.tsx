import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useRouter } from "next/router";

export default function ChessGamePage() {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState("white");
  const [usernameP1, setUsernameP1] = useState("You");
  const [usernameP2, setUsernameP2] = useState("Opponent");
  const [moveIndex, setMoveIndex] = useState(0);
  const router = useRouter();

  const moves =
    '["e4","e5","Nf3","d5","exd5","c6","Bb5","cxb5","O-O","Bc5","Re1","Nf6","Rxe5+","Kd7","Qe2","Nc6","d6","Re8","Nd4","Re7","Nxc6","Kxc6","Qe4+","Kxd6","c4","h5","Qd5+","Kc7","Qxc5+","Kb8","Rxe7","Qh8","Qc7#"]';

  const movesArray = JSON.parse(moves);

  const handleNextMove = () => {
    // Check if there are more moves to make
    if (moveIndex < movesArray.length) {
      const currentMove = movesArray[moveIndex];
      makeAMove(currentMove);
      setMoveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevMove = () => {
    // Check if there are previous moves to undo
    if (moveIndex > 0) {
      // Decrement moveIndex first
      setMoveIndex((prevIndex) => prevIndex - 1);

      // Recreate the game state at the previous move
      const updatedGame = new Chess();
      for (let i = 0; i < moveIndex - 1; i++) {
        updatedGame.move(movesArray[i]);
      }

      // Update the game state
      setGame(updatedGame);
    }
  };

  function makeAMove(move: any) {
    try {
      const updatedGame = new Chess(game.fen());
      const legalMoves = updatedGame.moves();

      console.log("Legal moves:", legalMoves);

      const moveResult = updatedGame.move(move);

      if (moveResult !== null) {
        // Perform any additional logic if needed
        // Update move history or any other state
        setGame(updatedGame); // Update the game state
        console.log("Move details:", move);
        console.log("Current game state:", updatedGame.fen());
      } else {
        console.error("Invalid move:", move);
      }
    } catch (error) {
      console.error("Error making move:", error);
    }
  }

  return (
    <div>
      <div className="flex justify-left items-center ml-[15%]">
        <div className="items-center w-[740px] mt-28">
          <div className="text-white text-xl flex justify-left items-left">
            {board === "white" ? `${usernameP2} (800)` : `${usernameP1} (800)`}
          </div>
          <div className="">
            <Chessboard
              position={game.fen()}
              areArrowsAllowed={true}
              boardOrientation={"white"}
            />
          </div>
          <div className="text-white text-xl flex justify-left items-left mb-8">
            {board === "white" ? `${usernameP1} (800)` : `${usernameP2} (800)`}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[500px] h-[320px] ml-32 mb-8 text-white shadow-lg rounded-3xl bg-slate-800 p-8 overflow-auto whitespace-pre-wrap">
            <div className="flex justify-center text-3xl font-bold">
              Move History
            </div>
            <div className="mt-6">{JSON.parse(moves).join(" ")}</div>
          </div>

          <div className="flex ml-24">
            <button
              className="text-white shadow-lg rounded-3xl bg-slate-800 p-6 hover:bg-slate-700 mr-8"
              onClick={handlePrevMove}
            >
              &lt; Prev Move
            </button>
            <button
              className="text-white shadow-lg rounded-3xl bg-slate-800 p-6 hover:bg-slate-700"
              onClick={handleNextMove}
            >
              Next Move &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
