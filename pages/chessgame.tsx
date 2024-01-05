import { useState, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";
import supabase from "@/components/SupabaseAPI";

export default function ChessGamePage() {
  const [game, setGame] = useState(new Chess());
  const [socket, setSocket] = useState<Socket | null>(null);
  const [player1, setPlayer1] = useState("?????");
  const [player2, setPlayer2] = useState("?????");
  const [board, setboard] = useState("white");
  const [player, setPlayer] = useState("1");
  const [gamestart, setGamestart] = useState(false);
  const [checkmate, setCheckmate] = useState(false);
  const [draw, setDraw] = useState(false);
  const [lastMoveSource, setLastMoveSource] = useState<string | null>(null);
  const [lastMoveTarget, setLastMoveTarget] = useState<string | null>(null);
  const [highlightedSquare, setHighlightedSquare] = useState<string | null>(
    null,
  );
  let [playerturn, setplayerturn] = useState(true);
  let quickstop = true;
  const [username, setUsername] = useState("Guest");
  const [usernameP1, setUsernameP1] = useState("");
  const [usernameP2, setUsernameP2] = useState("");
  const [gameaborted, setGameaborted] = useState(false);
  const [spectating, setSpectating] = useState(false);

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
      socket.once("connectedPlayersCount", async (count: any) => {
        if (count == 1) {
          setPlayer1("Player 1");
          setPlayer2("??????");
          setplayerturn(true);
          setPlayer("1");

          socket.emit("setUsername", "Player 1 Guest");
        }
        if (count == 2) {
          setPlayer1("Player 1");
          setPlayer2("Player 2");
          setboard("black");
          setplayerturn(false);
          setPlayer("2");
          setGamestart(true);

          socket.emit("setUsername", "Player 2 Guest");
        }
        if (count >= 3) {
          setSpectating(true);
        }
        console.log(count);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (username) {
      setPlayer1(username); // Update Player 1's username
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      setPlayer2(username); // Update Player 2's username
    }
  }, [username]);

  const GrabUsername = useCallback(async () => {
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const { data } = await supabase
      .from("user_profile")
      .select("username")
      .eq("id", userID);

    if (data && data.length > 0 && data[0].username) {
      const username = data[0].username;
      setUsername(username);
      if (socket) {
        socket.emit("p1usernameupdate", username);
      }
    }
  }, [socket]);

  GrabUsername();

  const SendGameToDatabase = async () => {
    try {
      await supabase.from("chess_games").upsert([
        {
          id: "bobssss",
          created_at: "2023-12-11 08:04:14.849812+00",
          movehistory: "F2s2",
          winner: "white",
        },
      ]);

      console.log("Data successfully sent to the database");
    } catch (error) {
      console.error("Error sending data to the database:", error);
    }
  };

  useEffect(() => {
    SendGameToDatabase();
  }, []);

  ///Always On
  useEffect(() => {
    if (socket) {
      socket.on("connectedPlayersCount", (count: any) => {
        if (count == 2) {
          setGamestart(true);
        } else if (count <= 2 && gamestart) {
          setGameaborted(true);
        }
      });

      socket.on("p1usernameupdateClient", (username) => {
        setUsernameP1(username);
      });

      socket.on("player1", (username) => {
        setUsernameP1(username);
      });
      socket.on("player2", (username) => {
        setUsernameP2(username);
      });
    }
  }, [socket, gamestart, usernameP1, usernameP2, username]);

  //Highlighting
  useEffect(() => {
    if (lastMoveSource && lastMoveTarget) {
      setHighlightedSquare(lastMoveTarget);
    }
  }, [lastMoveSource, lastMoveTarget]);

  ///Change move square colour to yellow
  const generateCustomSquareStyles = () => {
    const customStyles: { [key: string]: React.CSSProperties } = {};

    if (highlightedSquare) {
      customStyles[highlightedSquare] = {
        background: "rgba(255, 255, 200, 1)",
      };
    }

    return customStyles;
  };

  /////////////
  ////Chess////
  /////////////
  if (socket) {
    socket.on("gameState", (updatedBoard) => {
      if (updatedBoard && updatedBoard.after) {
        const fenString = updatedBoard.after;
        const newGame = new Chess();
        newGame.load(fenString); // Load the extracted FEN string
        setGame(newGame); // Update the game state

        // Highlight Square
        if (updatedBoard.to) {
          const { to } = updatedBoard;
          setHighlightedSquare(to); // Set the 'to' square as highlighted
        }

        //Check for win and draw
        if (newGame.isCheckmate()) {
          setCheckmate(true);
        }
        if (newGame.isDraw()) {
          setDraw(true);
        }
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

      if (newGame !== null && gamestart == true && gameaborted == false) {
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

  return (
    <div>
      <div className="flex justify-left items-center ml-[15%]">
        <div className="items-center w-[740px] mt-28">
          <div className="text-white text-xl flex justify-left items-left">
            {board === "white" ? `${usernameP2} (800)` : `${usernameP1} (800)`}
          </div>
          <div className={gamestart ? "" : "opacity-60"}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              areArrowsAllowed={true}
              boardOrientation={player === "2" ? "black" : "white"}
              customSquareStyles={generateCustomSquareStyles()}
            />
          </div>
          <div className="text-white text-xl flex justify-left items-left mb-8">
            {board === "white" ? `${usernameP1} (800)` : `${usernameP2} (800)`}
          </div>

          {gamestart === false && spectating == false && (
            <div className="text-black text-5xl font-bold animate-pulse animate-bounce absolute top-1/2 -translate-y-1/2 ml-36">
              Waiting for Opponent...
            </div>
          )}
          {spectating === true && (
            <div className="text-black text-5xl font-bold animate-pulse animate-bounce absolute top-1/2 -translate-y-1/2 ml-36">
              You are spectating!
            </div>
          )}
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
          {gamestart === true && gameaborted === true && (
            <div className="z-10 bg-slate-800 text-white w-[400px] h-[400px] text-5xl font-bold absolute top-1/2 -translate-y-1/2 ml-48 rounded-lg shadow drop-shadow-xl">
              <div className="text-center mt-8">Game Aborted</div>
              <div className="text-center mt-8">A player has left!</div>
              <div className="text-center mt-8">
                Refresh to start a new game
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
