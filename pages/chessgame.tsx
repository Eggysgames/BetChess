import { useState, useRef, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";
import supabase from "@/components/SupabaseAPI";

export default function PlayRandomMoveEngine() {
  let mover = false;
  const [game, setGame] = useState(new Chess());
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [username, setUsername] = useState("Guest");
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("betchess-ecc275519414.herokuapp.com", {
      reconnectionDelay: 1000,
      reconnection: false,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleEnterPress = (event: any) => {
    if (event.key === "Enter") {
      if (socket) {
        const messageWithUsername = `${username} : ${inputText}`;
        socket.emit("message", messageWithUsername); // Emit the message with username
        setInputText("");
      }
      setInputText("");
    }
  };

  if (socket) {
    socket.on("message", (message) => {
      setConversation([...conversation, message]); // Update conversation with the received message
    });
  }

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

  const GrabUsername = useCallback(async () => {
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const { data } = await supabase
      .from("user_profile")
      .select("username")
      .eq("id", userID);

    if (data && data.length > 0 && data[0].username) {
      const username = data[0].username;
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    GrabUsername();
  }, [GrabUsername]);

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

        <div className="shadow-md drop-shadow-xl rounded-3xl bg-slate-800 mb-5 h-[650px] w-[550px] ml-16 mt-32 flex flex-col select-none">
          <div className="m-4 flex-1 overflow-y-auto select-none">
            {conversation.map((message, index) => {
              const parts = message.split(/:\s*(.+)/); // Split message at the first colon and spaces
              const sender = parts[0].trim();
              const content = parts[1]?.trim() || "";

              return (
                <p key={index} className="text-white text-left p-1 mr-2">
                  <span
                    className={
                      sender === username ? "text-sky-400" : "text-yellow-500"
                    }
                  >
                    {sender}
                  </span>
                  : {content}
                </p>
              );
            })}

            <div ref={conversationEndRef}></div>
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
