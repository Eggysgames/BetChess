import { SubmissionButton } from "../components/StyledButton";
import { createClient, Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Register = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [ErrorString, SetErrorString] = useState("default");

  const handleCheckboxChange = () => {
    setisChecked(!isChecked);
    console.log(isChecked);
  };

  const handleRegister = async () => {
    const usernameExists = await checkUsernameAvailability(username);

    if (usernameExists?.exists) {
      SetErrorString("Username already exists");
      setShowError(true);
      return;
    }

    if (isChecked) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            emailRedirectTo: "https://bet-chess.vercel.app/emailconfirmed",
          },
        });

        if (data?.user?.identities?.length === 0) {
          SetErrorString("Email already exists");
          setShowError(true);
        } else if (error) {
          SetErrorString(error.message);
          setShowError(true);
        } else {
          const userID = data.user?.id;
          insertUserProfile(userID);
          window.location.href = "/signupconfirmed";
        }
      } catch (error) {
        console.error("Login failed:", (error as any).message);
      }
    } else {
      SetErrorString("You need to accept the Terms and Conditions");
      setShowError(true);
    }
  };

  const insertUserProfile = async (userID: any) => {
    try {
      const { data, error } = await supabase.from("user_profile").insert([
        {
          id: userID,
          username: username,
          profilepic: "/defaulticon.png",
        },
      ]);

      if (error) {
        console.error("Error inserting data:", error.message);
        return;
      }
      console.log("Data inserted:", data);
    } catch (error) {
      console.error("Error inserting data:");
    }
  };

  const GrabUsername = async () => {
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const { data } = await supabase
      .from("user_profile")
      .select("username")
      .eq("id", userID);

    if (data && data.length > 0 && data[0].username) {
      const username = data[0].username;
      setUsername(username);
    }
  };

  const checkUsernameAvailability = async (checkUsername: any) => {
    try {
      const { data, error } = await supabase
        .from("user_profile")
        .select("id")
        .ilike("username", checkUsername);

      if (error) {
        console.error("Error checking username:", error.message);
        return { exists: false, error: error.message };
      }

      if (data && data.length > 0) {
        return { exists: true, error: null };
      } else {
        return { exists: false, error: null };
      }
    } catch (error) {
      console.error("Error checking username:");
    }
  };

  useEffect(() => {
    GrabUsername();
  }, []);

  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:h-screen">
      <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-[300px] lg:w-full lg:max-w-md text-center p-4 lg:p-8 mt-36 lg:mt-0 mb-8">
        <p className="underline text-4xl">Registration</p>

        <div className="mx-auto my-10 max-w-md grid grid-cols-3 gap-3">
          <span className="flex items-center justify-end text-base lg:text-2xl">
            Username :
          </span>
          <div className="col-span-2">
            <input
              className="w-full px-4 py-2 border rounded text-black text-sm"
              type="text"
              placeholder="<Enter Username>"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <span className="flex items-center justify-end text-base lg:text-2xl">
            Email :
          </span>
          <div className="col-span-2">
            <input
              className="w-full px-4 py-2 border rounded text-black text-sm"
              type="email"
              placeholder="<Enter Email>"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <span className="flex items-center justify-end text-base lg:text-2xl">
            Password :
          </span>
          <div className="col-span-2">
            <input
              className="w-full px-4 py-2 border rounded text-black text-sm"
              type="password"
              placeholder="<Enter Password>"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <p className="text-sm">
          Computers and computer-assisted players are not allowed to play.
          Please do not get assistance from chess engines, databases, or from
          other players while playing. Also note that making multiple accounts
          is strongly discouraged and excessive multi-accounting will lead to
          being banned.
        </p>

        <br></br>

        <p className="text-sm underline">
          {" "}
          By Registering, you agree to be bound by our <br></br>
          <a
            href="/cheatingpolicy"
            className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline"
            target="_blank"
          >
            Terms of Service and Cheating Policy
          </a>
        </p>

        <br></br>

        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox text-indigo-600 h-5 w-5 rounded focus:ring-indigo-500 border-gray-300"
        />

        <span className="ml-2 text-md">
          I have read and agree to the Terms of Service
        </span>

        <br></br>
        <br></br>

        {showError && <p className="text-amber-600 text-xs">{ErrorString}</p>}

        <br></br>

        <SubmissionButton inserttext="Register" onClick={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
