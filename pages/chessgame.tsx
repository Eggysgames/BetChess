import { useState, useEffect, useCallback, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";
import supabase from "@/components/SupabaseAPI";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const [username, setUsername] = useState("Guest");
  const [usernameP1, setUsernameP1] = useState("");
  const [usernameP2, setUsernameP2] = useState("");
  const [gameaborted, setGameaborted] = useState(false);
  const [spectating, setSpectating] = useState(false);
  const [gameRoom, setgameRoom] = useState("?????");

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
              areArrowsAllowed={true}
              boardOrientation={player === "2" ? "black" : "white"}
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
