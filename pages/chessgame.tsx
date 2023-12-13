import { useState, useRef, useEffect, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { io, Socket } from "socket.io-client";
import supabase from "@/components/SupabaseAPI";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export default function PlayRandomMoveEngine() {
  let mover = false;
  const [game, setGame] = useState(new Chess());
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [username, setUsername] = useState("Guest");
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);

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

  const sendMessage = async () => {
    if (socket && inputText.trim() !== "") {
      const messageWithUsername = `${username} : ${inputText}`;
      const timestamp = new Date().toISOString();

      const messageData = {
        sender: username,
        content: inputText,
        timestamp: timestamp,
      };

      socket.emit("message", messageWithUsername);

      await supabase.from("chat_messages").insert([messageData]);

      setInputText("");
    }
  };

  const handleEnterPress = async (event: any) => {
    if (event.key === "Enter") {
      await sendMessage(); // Call sendMessage function when Enter is pressed
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

  const toggleEmojiPopup = () => {
    setShowEmojiPopup(!showEmojiPopup);
  };

  const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    const emojiUnicode = emoji.emoji;
    setInputText((prevInputText) => prevInputText + emojiUnicode);
  };

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

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .order("timestamp", { ascending: false })
        .range(0, 49); // Fetches up to 50 most recent messages

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        if (data) {
          const messages = data
            .map((msg) => `${msg.sender} : ${msg.content}`)
            .reverse();
          setConversation(messages);

          if (data.length >= 50) {
            const oldestMessages = data.slice(49).map((msg) => msg.timestamp);
            await supabase
              .from("chat_messages")
              .delete()
              .lt("timestamp", oldestMessages[0]); // Delete messages older than the 50th message
          }
        }
      }

      setLoading(false);
    };

    fetchPreviousMessages();
    scrollToBottom();
  }, []);

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

        <div className="shadow-md drop-shadow-xl rounded-3xl bg-slate-800 lg:h-[650px] h-[480px] lg:w-[550px] w-[340px]  flex flex-col select-none ml-16 mt-16">
          <div className="m-4 flex-1 overflow-y-auto select-none">
            {loading ? (
              <div className="m-4 flex-1 flex justify-center items-center mt-16">
                <Image
                  className="inline-block mr-3 hover:opacity-40 rounded-3xl mt-8 animate-spin h-28 w-28 mr-8 flex justify-center"
                  src="/loading.png"
                  alt="Loading"
                  width={130}
                  height={130}
                  unoptimized={true}
                />
              </div>
            ) : (
              <div className="m-4 flex-1 overflow-y-auto select-none overflow-x-hidden">
                {conversation.map((message, index) => {
                  const parts = message.split(/:\s*(.+)/);
                  const sender = parts[0].trim();
                  const content = parts[1]?.trim() || "";

                  return (
                    <p key={index} className="text-white text-left p-1 mr-2">
                      <span
                        className={
                          sender === username
                            ? "text-sky-400"
                            : "text-yellow-500"
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
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <input
              className="rounded-3xl bg-slate-600 p-2 mb-4 ml-4 lg:w-[500px] w-[200px] text-white"
              type="text"
              placeholder="Aa"
              value={inputText}
              onChange={handleInputChange}
              onKeyUp={handleEnterPress}
              maxLength={50}
            />
            <Image
              src="/send.png"
              alt="Send"
              width="50"
              height="50"
              className="send-icon h-8 w-8 mr-4 mb-4 ml-4 cursor-pointer hover:opacity-40 invert"
              onClick={sendMessage}
            />
            <button
              className="h-15 w-15 mr-4 mb-4 cursor-pointer hover:opacity-40"
              onClick={toggleEmojiPopup}
            >
              <Image
                src="/emoji.png"
                alt="Send"
                width="40"
                height="40"
                className="mb-2"
              />
            </button>

            {showEmojiPopup && (
              <div className="absolute z-40 bg-white max-h-80 mb-8 lg:right-4 bottom-40">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={300}
                  autoFocusSearch={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
