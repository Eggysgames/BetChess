import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";

export default function ChessGamePage() {
  const [game, setGame] = useState(new Chess());
  const [socket, setSocket] = useState<Socket | null>(null);
  const [player1, setPlayer1] = useState("?????");
  const [player2, setPlayer2] = useState("?????");
  const [board, setboard] = useState("white");
  const [player, setPlayer] = useState("1");
  const [gamestart, setGamestart] = useState(false);
  let [playerturn, setplayerturn] = useState(true);
  const [lastMoveSource, setLastMoveSource] = useState<string | null>(null);
  const [lastMoveTarget, setLastMoveTarget] = useState<string | null>(null);
  const [highlightedSquare, setHighlightedSquare] = useState<string | null>(
    null,
  );
  let quickstop = true;

  useEffect(() => {
    const socket = io("https://betchess-ecc275519414.herokuapp.com", {
      reconnectionDelay: 1000,
      reconnection: false,
    });

    socket.on("connect", () => {
      console.log("Connected To Server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(socket);

    if (socket) {
      socket.once("connectedPlayersCount", (count: any) => {
        if (count == 1) {
          setPlayer1("Player 1");
          setPlayer2("??????");
          setplayerturn(true);
          setPlayer("1");
        }
        if (count == 2) {
          setPlayer1("Player 1");
          setPlayer2("Player 2");
          setboard("black");
          setplayerturn(false);
          setPlayer("2");
          setGamestart(true);
        }
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  ///Always On
  useEffect(() => {
    if (socket) {
      socket.on("connectedPlayersCount", (count: any) => {
        if (count == 2) {
          setGamestart(true);
        }
      });
    }
  }, [socket]);

  /////////////
  ////Chess
  /////////////
  if (socket) {
    socket.on("gameState", (updatedBoard) => {
      if (updatedBoard && updatedBoard.after) {
        const fenString = updatedBoard.after;
        const newGame = new Chess();
        newGame.load(fenString); // Load the extracted FEN string
        setGame(newGame);
      }

      if (updatedBoard && updatedBoard.to) {
        const { to } = updatedBoard;
        setHighlightedSquare(to); // Set the 'to' square as highlighted
      }
    });
  }

  function sendMoveToOpponent(move: any) {
    if (socket) {
      socket.emit("userMove", move);
    }
  }

  if (socket) {
    socket.on("playerTurn", (playerTurn: any) => {
      setplayerturn(playerTurn);
      console.log(playerturn);
    });
  }

  function makeAMove(move: any) {
    try {
      const newGame = new Chess(game.fen());

      if (newGame !== null) {
        const moveResult = newGame.move(move);

        if (moveResult !== null) {
          // Check if it's Player 1's turn and the piece moved is white
          if (player === "1" && moveResult.color === "w") {
            if (socket && quickstop) {
              setGame(newGame);
              socket.emit("userMove", moveResult); // Sending the FEN after the move
              socket.emit("switchplayer");
              quickstop = false;
              setLastMoveSource(move.from);
              setLastMoveTarget(move.to);
            }
          }
          // Check if it's Player 2's turn and the piece moved is black
          else if (player === "2" && moveResult.color === "b") {
            if (socket && quickstop) {
              setGame(newGame);
              socket.emit("userMove", moveResult); // Sending the FEN after the move
              socket.emit("switchplayer");
              quickstop = false;
              setLastMoveSource(move.from);
              setLastMoveTarget(move.to);
            }
          }
        }
      }
    } catch (error) {
      console.log("Catch in MakeaMove because -", error);
    }
  }

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

    sendMoveToOpponent(move);

    return true;
  }

  useEffect(() => {
    if (lastMoveSource && lastMoveTarget) {
      setHighlightedSquare(lastMoveTarget);
    }
  }, [lastMoveSource, lastMoveTarget]);

  const generateCustomSquareStyles = () => {
    const customStyles: { [key: string]: React.CSSProperties } = {};

    if (highlightedSquare) {
      customStyles[highlightedSquare] = {
        background: "rgba(255, 255, 40, 0.2)",
      };
    }

    return customStyles;
  };

  return (
    <div>
      <div className="flex justify-left items-center ml-[15%]">
        <div className="items-center w-[740px] mt-32">
          <div className="text-white text-xl flex justify-left items-left">
            {player2} (800)
          </div>
          <div className={gamestart ? "" : "opacity-60"}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              areArrowsAllowed={true}
              boardOrientation={player2 === "Player 2" ? "black" : "white"}
              customSquareStyles={generateCustomSquareStyles()}
            />
          </div>
          <div className="text-white text-xl flex justify-left items-left mb-8">
            {player1} (800)
          </div>

          {gamestart === false && (
            <div className="text-black text-5xl font-bold animate-pulse animate-bounce absolute top-1/2 -translate-y-1/2 ml-36">
              Waiting for Opponent...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
