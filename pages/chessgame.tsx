import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io } from "socket.io-client";
import { useRouter } from "next/router";

export default function ChessGamePage() {
  const [game, setGame] = useState(new Chess());
  const [board, setboard] = useState("white");
  const [usernameP1, setUsernameP1] = useState("You");
  const [usernameP2, setUsernameP2] = useState("Opponent");

  const router = useRouter();

  useEffect(() => {
    const socket = io("https://betchess-ecc275519414.herokuapp.com", {
      reconnectionDelay: 1000,
      reconnection: false,
    });

    socket.on("connect", () => {
      console.log("Connected To Server");
      socket.emit("joinLobby");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    if (socket) {
      socket.on("gamestart", (gameRoom) => {
        router.push(`/game/${gameRoom}`);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="flex justify-left items-center ml-[15%]">
        <div className="items-center w-[740px] mt-28">
          <div className="text-white text-xl flex justify-left items-left">
            {board === "white" ? `${usernameP2} (800)` : `${usernameP1} (800)`}
          </div>
          <div className="opacity-60">
            <Chessboard
              position={game.fen()}
              areArrowsAllowed={true}
              boardOrientation={"white"}
            />
          </div>
          <div className="text-white text-xl flex justify-left items-left mb-8">
            {board === "white" ? `${usernameP1} (800)` : `${usernameP2} (800)`}
          </div>
          <div className="text-black text-5xl font-bold animate-pulse animate-bounce absolute top-1/2 -translate-y-1/2 ml-36">
            Waiting for Opponent...
          </div>
          )
        </div>
      </div>
    </div>
  );
}
