import { useState, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useRouter } from "next/router";
import supabase from "@/components/SupabaseAPI";

export default function ChessGamePage() {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState("white");
  const [usernameP1, setUsernameP1] = useState("You");
  const [usernameP2, setUsernameP2] = useState("Opponent");
  const [moveIndex, setMoveIndex] = useState(0);
  const [gameid, setGameID] = useState("15ff12f2-665f-4b97-bf2b-8be3526b6c0e");
  const movePairs = [];
  let [moves, setMoves] = useState("[]");
  //let moves = "[]";
  let movesArray = JSON.parse(moves);

  const [bestMove, setBestMove] = useState<string | null>(null);
  const [bestMove1, setBestMovePos1] = useState<Square | null>(null);
  const [bestMove2, setBestMovePos2] = useState<Square | null>(null);

  const [isFetchingMove, setIsFetchingMove] = useState(false);
  const [moveHistory, setMoveHistory] = useState<JSX.Element[]>([]);

  const setGameIDDB = async () => {
    try {
      // Fetch move history data from Supabase using the new gameid
      const { data, error } = await supabase
        .from("chess_games")
        .select("movehistory")
        .eq("id", gameid)
        .single();

      if (error) {
        console.error("Error fetching move history:", error.message);
        return;
      }

      // Update moves state with the fetched data
      if (data) {
        // Update moves state with the fetched data
        setMoves(data.movehistory);
        movesArray = JSON.parse(data.movehistory);

        console.log(moves);
        const movePairs = [];
        for (let i = 0; i < movesArray.length; i += 2) {
          movePairs.push([movesArray[i], movesArray[i + 1]]);
        }

        setMoveIndex(0);

        const moveHistory = movePairs.map((pair, index) => (
          <div key={index} className={`flex mt-2 items-center`}>
            <div
              className={`mr-2 ${
                index * 2 === moveIndex - 1
                  ? "font-bold text-yellow-500"
                  : "text-white"
              }`}
            >
              {pair[0]}
            </div>
            {pair[1] && (
              <div
                className={`ml-2 ${
                  index * 2 + 1 === moveIndex - 1
                    ? "font-bold text-yellow-500"
                    : "text-white"
                }`}
              >
                {pair[1]}
              </div>
            )}
          </div>
        ));
        setMoveHistory(moveHistory);
      } else {
        console.log("No move history found for the provided gameid");
      }

      // Update the gameid state after fetching move history
      setGameID(gameid);
    } catch (error) {
      console.error("Error setting game ID:", error);
    }
  };

  const handleNextMove = async () => {
    // Check if there are more moves to make and if another move is not currently being fetched
    if (moveIndex < movesArray.length && !isFetchingMove) {
      setIsFetchingMove(true); // Set flag to indicate that a move is being fetched

      const currentMove = movesArray[moveIndex];
      const updatedGame = makeAMove(currentMove);
      setGame(updatedGame); // Update the game state with the returned value

      // Fetch the best move
      try {
        const response = await fetch(
          `https://stockfish.online/api/stockfish.php?fen=${encodeURIComponent(
            updatedGame.fen(),
          )}&depth=10&mode=bestmove`,
        );
        const data = await response.json();

        console.log(data);
        if (data.success) {
          if (data.data === "Game over in position.") {
            // Game over, set bestMove1 and bestMove2 to null
            setBestMovePos1(null);
            setBestMovePos2(null);
          } else {
            // Extract best move data
            const moveParts = data.data.split(" ");
            const bestMove = moveParts[1];
            const bestMove1 = bestMove.substring(0, 2); // Extract location of piece
            const bestMove2 = bestMove.substring(2, 4); // Extract destination
            setBestMovePos1(bestMove1);
            setBestMovePos2(bestMove2);
          }
        } else {
          console.error("Stockfish API error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching best move:", error);
      } finally {
        setIsFetchingMove(false); // Reset the flag after the move has been fetched
      }

      setMoveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevMove = async () => {
    // Check if there are previous moves to undo and if another move is not currently being fetched
    if (moveIndex > 0 && !isFetchingMove) {
      setIsFetchingMove(true); // Set flag to indicate that a move is being fetched

      // Decrement moveIndex first
      setMoveIndex((prevIndex) => prevIndex - 1);

      // Recreate the game state at the previous move
      const updatedGame = new Chess();
      for (let i = 0; i < moveIndex - 1; i++) {
        updatedGame.move(movesArray[i]);
      }

      // Update the game state
      setGame(updatedGame);

      // Fetch the best move for the previous state
      try {
        const response = await fetch(
          `https://stockfish.online/api/stockfish.php?fen=${encodeURIComponent(
            updatedGame.fen(),
          )}&depth=10&mode=bestmove`,
        );
        const data = await response.json();

        console.log(data);
        if (data.success) {
          const moveParts = data.data.split(" ");
          const bestMove = moveParts[1];
          const bestMove1 = bestMove.substring(0, 2); // Extract location of piece
          const bestMove2 = bestMove.substring(2, 4); // Extract destination
          setBestMovePos1(bestMove1);
          setBestMovePos2(bestMove2);
        } else {
          console.error("Stockfish API error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching best move:", error);
      } finally {
        setIsFetchingMove(false); // Reset the flag after the move has been fetched
      }
    }
  };

  function makeAMove(move: any) {
    try {
      const updatedGame = new Chess(game.fen());
      const moveResult = updatedGame.move(move);

      if (moveResult !== null) {
        // Perform any additional logic if needed
        // Update move history or any other state
        console.log("Move details:", move);
        console.log("Current game state:", updatedGame.fen());
        return updatedGame; // Return the updated game state
      } else {
        console.error("Invalid move:", move);
        return game; // Return the current game state if the move is invalid
      }
    } catch (error) {
      console.error("Error making move:", error);
      return game; // Return the current game state in case of error
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
              areArrowsAllowed={false}
              customArrows={
                bestMove1 && bestMove2 ? [[bestMove1, bestMove2]] : []
              }
              boardOrientation={"white"}
              arePiecesDraggable={false}
            />
          </div>
          <div className="text-white text-xl flex justify-left items-left mb-8">
            {board === "white" ? `${usernameP1} (800)` : `${usernameP2} (800)`}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col ml-32 mt-16">
            <div className="w-[500px] h-[80px] mb-4 text-white shadow-lg rounded-3xl bg-slate-800 p-2 overflow-auto whitespace-pre-wrap">
              <div className="flex justify-center text-xl font-bold">
                Game ID
              </div>
              <input
                type="text"
                className="text-center mt-2 bg-transparent border-none focus:outline-none w-full"
                value={gameid}
                onChange={(e) => setGameID(e.target.value)}
              />
            </div>

            <button
              className="text-white shadow-lg rounded-3xl bg-slate-800 p-4 hover:bg-slate-700 mb-4"
              onClick={setGameIDDB}
            >
              Load Game
            </button>
          </div>

          <div className="w-[500px] h-[500px] ml-32 mb-8 text-white shadow-lg rounded-3xl bg-slate-800 p-8 overflow-auto whitespace-pre-wrap">
            <div className="flex justify-center text-3xl font-bold">
              Move History
            </div>
            <div>{moveHistory}</div>
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
