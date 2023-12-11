import { useState, useRef, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import supabase from "@/components/SupabaseAPI";

export default function PlayRandomMoveEngine() {
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
        socket.emit("message", messageWithUsername);
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
      <div className="text-white mt-28 flex justify-center mb-6">
        Welcome to BetChess Chat!
      </div>
      <div className="flex justify-center items-center">
        <div className="shadow-md drop-shadow-xl rounded-3xl bg-slate-800 lg:h-[650px] h-[550px] lg:w-[550px] w-[300px]  flex flex-col select-none">
          <div className="m-4 flex-1 overflow-y-auto select-none">
            {conversation.map((message, index) => {
              const parts = message.split(/:\s*(.+)/);
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
              className="rounded-3xl bg-slate-600 p-2 mb-4 lg:w-[500px] w-[280px] text-white"
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
