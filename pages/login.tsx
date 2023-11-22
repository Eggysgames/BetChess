import { SubmissionButton } from "../components/StyledButton";
import React, { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateLastLogin = async (userID: any) => {
    try {
      const currentDateTime = new Date().toISOString();

      // Check if the user exists in user_profile
      const { data: existingUser, error: userError } = await supabase
        .from("user_profile")
        .select("*")
        .eq("id", userID)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }

      if (existingUser) {
        // User exists, update the last_login field
        const { data: updateData, error: updateError } = await supabase
          .from("user_profile")
          .update({ last_login: currentDateTime })
          .eq("id", userID);

        if (updateError) {
          console.error("Error updating last login:", updateError.message);
          return;
        }

        console.log("Last login updated:", updateData);
      } else {
        console.error("User not found in user_profile");
      }
    } catch (error) {
      console.error("Error updating last login:");
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error(error.message);
        setShowError(true);
      } else {
        const userID = data?.user?.id;
        console.log(userID);
        if (userID) {
          updateLastLogin(userID);
        }
        router.reload();
      }
    } catch (error) {
      console.error("Login failed:", (error as any).message);
    }
  };

  if (session) {
    router.push("/");
    return (
      <div>
        <p className="text-white text-4xl text-center mt-8">
          Welcome, {session.user?.email}
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sky-300 flex mx-auto text-3xl mt-8 hover:underline"
        >
          Sign Out
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
          <p className="underline text-4xl">Login</p>

          <div className="mx-auto my-6 max-w-md grid grid-cols-3 gap-3">
            <span className="flex items-center justify-end">Email :</span>
            <div className="col-span-2">
              <input
                className="w-full px-4 py-2 border rounded text-black text-sm"
                type="text"
                placeholder="<Enter Email>"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <span className="flex items-center justify-end">Password :</span>
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

          {showError && (
            <p className="text-amber-600 text-xs">
              Invalid Username or Password
            </p>
          )}

          <div className="mt-2">
            <div>
              <SubmissionButton inserttext="Login" onClick={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
