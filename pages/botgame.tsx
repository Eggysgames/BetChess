import { useState, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import supabase from "@/components/SupabaseAPI";
import { v4 as uuidv4 } from "uuid";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());
  const [checkmate, setCheckmate] = useState(false);
  const [draw, setDraw] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const lastMoveRef = useRef<string | null>(null);

  let mover = false;
  let sendonce = false;

  const SendGameToDatabase = async () => {
    const currentDateTime = new Date().toISOString();

    const gameId = uuidv4(); // Generate a UUID

    let winner = "white";

    try {
      await supabase.from("chess_games").upsert([
        {
          id: gameId,
          created_at: currentDateTime,
          movehistory: moveHistory,
          winner: winner,
          player1: "test",
          player2: "test",
        },
      ]);

      console.log("Data successfully sent to the database");
    } catch (error) {
      console.error("Error sending data to the database:", error);
    }
  };

  function makeAMove(move: any) {
    try {
      if (!game.isDraw()) {
        const moveResult = game.move(move);
        if (mover === false) {
          setTimeout(makeRandomMove, 200);
          mover = true;
        }

        const newGame = new Chess(game.fen());
        setGame(newGame);

        if (moveResult) {
          // Return the move information if the move is valid
          return moveResult;
        }
      }
    } catch {
      console.log("Invalid Move");
    }

    // Return null if the move is invalid
    return null;
  }

  useEffect(() => {
    if (checkmate) {
      SendGameToDatabase();
    }
  }, [checkmate]);

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isCheckmate()) {
      setCheckmate(true);
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const randomMove = possibleMoves[randomIndex];
    const moveResult = makeAMove(randomMove);

    // If the move is valid, add it to the move history
    if (moveResult) {
      const newMove = moveResult.san;
      setMoveHistory((prevMoveHistory) => [...prevMoveHistory, newMove]);
    }
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    // Make the move and retrieve the move information
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for simplicity
    });

    // Check if the move is null (invalid move)
    if (move === null) {
      return false;
    }

    // Extract the move notation (e.g., "g6") from the move information
    const newMove = move.san;

    // Check if the move is not the same as the last move and not in the history before adding
    if (newMove !== lastMoveRef.current && !moveHistory.includes(newMove)) {
      setMoveHistory((prevMoveHistory) => [...prevMoveHistory, newMove]);
      // Update the last move using the ref
      lastMoveRef.current = newMove;
    }

    console.log(moveHistory);

    // Return true to indicate a successful move
    return true;
  }

  return (
    <div className="flex justify-left items-center ml-[15%]">
      <div className="items-center w-[740px] mt-28 flex">
        <div className="">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            areArrowsAllowed={true}
          />
          {checkmate === true && (
            <div className="z-10 bg-slate-800 text-white w-[400px] h-[400px] text-5xl font-bold absolute top-1/2 -translate-y-1/2 ml-48 rounded-lg shadow drop-shadow-xl">
              <div className="text-center mt-8">Checkmate!</div>
              <div className="text-center mt-16">Player ? Wins</div>
            </div>
          )}
          {draw === true && (
            <div className="z-10 bg-slate-800 text-white w-[400px] h-[400px] text-5xl font-bold absolute top-1/2 -translate-y-1/2 ml-48 rounded-lg shadow drop-shadow-xl">
              <div className="text-center mt-8">Draw!</div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center ml-8">
          <div className="flex flex-col mt-16">
            <div className="w-[500px] h-[80px] mb-4 text-white shadow-lg rounded-3xl bg-slate-800 p-2 overflow-auto whitespace-pre-wrap">
              <div className="flex justify-center text-xl font-bold">
                Game ID
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
