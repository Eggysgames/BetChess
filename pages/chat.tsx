import { useState, useRef, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import supabase from "@/components/SupabaseAPI";
import Image from "next/image";

export default function GlobalChat() {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [username, setUsername] = useState(
    "Guest" + Math.floor(Math.random() * 1000),
  );
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;

    const pattern = /^[a-zA-Z0-9 !@#$%^&*()<>.]+$/;

    if (!pattern.test(inputText)) {
      console.log("Input contains special/unwanted characters.");
    } else {
      setInputText(inputText);
    }

    if (inputText.trim() === "") {
      setInputText("");
    }
  };

  const handleEnterPress = async (event: any) => {
    if (event.key === "Enter") {
      if (socket) {
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

      setLoading(false); // Set loading to false after updating conversation state
    };

    fetchPreviousMessages();
    scrollToBottom();
  }, []);

  const [newUsername, setNewUsername] = useState(username);
  const [isChoosingUsername, setIsChoosingUsername] = useState(false);

  const handleUsernameChange = (event: any) => {
    const inputUsername = event.target.value;

    // Regular expression pattern to allow only letters and numbers
    const pattern = /^[a-zA-Z0-9]*$/;

    // Check if the entered username matches the pattern
    if (pattern.test(inputUsername)) {
      setNewUsername(inputUsername); // Update the state or value of newUsername
    }
  };

  const handleUsernameKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      // Check if newUsername contains at least one letter
      if (newUsername.match(/[a-zA-Z]/)) {
        setUsername(newUsername);
        setIsChoosingUsername(false);
      }
    }
  };

  useEffect(() => {
    if (username.startsWith("Guest")) {
      setIsChoosingUsername(true);
    } else {
      setIsChoosingUsername(false);
      scrollToBottom(); // Scroll to bottom after username selection
    }
  }, [username]);

  useEffect(() => {
    if (!isChoosingUsername) {
      scrollToBottom();
    }
  }, [isChoosingUsername, conversation]);

  if (isChoosingUsername) {
    return (
      <div>
        <div className="text-white mt-28 flex justify-center mb-6">
          Welcome to BetChess Chat!
        </div>
        <div className="flex justify-center items-center">
          <div className="shadow-md drop-shadow-xl rounded-3xl bg-slate-800 lg:h-[650px] h-[450px] lg:w-[550px] w-[300px]  flex flex-col select-none">
            <div className="text-white flex justify-center lg:mt-36 mt-44 lg:text-xl text-sm">
              Choose a Username and Press Enter
            </div>
            <div className="flex justify-center">
              <div className="m-4 overflow-y-auto select-none p-4">
                <input
                  className="rounded-3xl bg-slate-600 p-2 lg:w-[200px] w-[200px] text-white text-center"
                  type="text"
                  placeholder="Choose a username"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  onKeyDown={handleUsernameKeyPress}
                  maxLength={14}
                />
              </div>
            </div>
            <div className="text-white flex justify-center lg:text-md text-sm">
              (Max 12 Characters)
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-white mt-28 flex justify-center mb-6">
          Welcome to BetChess Chat!
        </div>
        <div className="flex justify-center items-center">
          <div className="shadow-md drop-shadow-xl rounded-3xl bg-slate-800 lg:h-[650px] h-[550px] lg:w-[550px] w-[300px]  flex flex-col select-none">
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
            <div className="flex flex-col items-center justify-between mt-4">
              <input
                className="rounded-3xl bg-slate-600 p-2 mb-4 lg:w-[500px] w-[280px] text-white"
                type="text"
                placeholder="Aa"
                value={inputText}
                onChange={handleInputChange}
                onKeyUp={handleEnterPress}
                maxLength={50}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
