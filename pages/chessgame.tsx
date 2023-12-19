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
  let [playerturn, setplayerturn] = useState(true);

  useEffect(() => {
    const socket = io("betchess-ecc275519414.herokuapp.com", {
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
      socket.emit("switchplayer");
    }

    if (socket) {
      socket.on("playerTurn", (playerTurn: any) => {
        console.log("Turn is " + playerTurn);
      });
    }

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
        }
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  /////////////
  ////Chess
  /////////////
  useEffect(() => {
    let runonce = true;
    const handleUserMove = (move: any) => {
      if (runonce) {
        makeAMove(move);
        runonce = false;
        setplayerturn(true);
      }
    };

    if (socket) {
      socket.on("userMove", handleUserMove);
    }
  });

  function sendMoveToOpponent(move: any) {
    if (socket) {
      socket.emit("userMove", move);
    }
  }

  function makeAMove(move: any) {
    try {
      const newGame = new Chess(game.fen());

      if (newGame !== null) {
        // Null check before using newGame
        const moveResult = newGame.move(move);

        console.log("Turn =" + playerturn);

        if (!playerturn) {
          console.log("Not your turn");
        }

        if (moveResult !== null) {
          if (socket && playerturn) {
            setGame(newGame);
            socket.emit("userMove", move);
            setplayerturn(false);
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

  /////////////

  return (
    <div>
      <div className="flex justify-left items-center ml-[15%]">
        <div className="items-center w-[740px] mt-32">
          <div className="text-white text-xl flex justify-left items-left">
            {player2} (800)
          </div>
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            areArrowsAllowed={true}
            boardOrientation={player2 === "Player 2" ? "black" : "white"}
          />
          <div className="text-white text-xl flex justify-left items-left mb-8">
            {player1} (800)
          </div>
        </div>
      </div>
    </div>
  );
}
