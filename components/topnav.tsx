import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient, Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { StyledButton, DefaultButton } from "../components/StyledButton";

import {
  faGamepad,
  faUser,
  faBook,
  faChess,
} from "@fortawesome/free-solid-svg-icons";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Topnav = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else {
        setSession(sessionData?.session || null);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("authToken");
    setSession(null);
    router.reload();
  };

  return (
    <div>
      <header className="bg-gray-700 text-white lg:p-1 fixed w-full top-0 z-10 opacity-100 shadow-md">
        <div className="flex items-center justify-between mx-auto font-bold lg:grid lg:grid-cols-3 ">
          <div className="flex">
            <Image
              className="items-left justify-center object-fill hidden lg:block ml-8"
              src="/pawn.svg"
              alt="Logo"
              width={60}
              height={60}
            />
          </div>

          <div className="flex">
            <Link href="/">
              <div className="hover:bg-gray-500 p-2 rounded-lg text-white">
                <div className="inline-block p-0  lg:mr-2 text-sm lg:text-lg lg:p-2 ml-2 lg:ml-0">
                  <FontAwesomeIcon
                    className="ml-1 w-8 mr-1 lg:ml-0"
                    icon={faChess}
                  />
                  Home
                </div>
              </div>
            </Link>

            <Link href="/cashgameselect">
              <div className="hover:bg-gray-500 p-2 rounded-lg text-white">
                <div className="inline-block p-0 lg:mr-2 text-sm lg:text-lg lg:p-2 ml-2 lg:ml-0">
                  <FontAwesomeIcon
                    className="ml-2 w-8 mr-1 lg:ml-0"
                    icon={faGamepad}
                  />
                  Play
                </div>
              </div>
            </Link>

            <Link href="/cheatingpolicy">
              <div className="hover:bg-gray-500 p-2 rounded-lg text-white">
                <div className="inline-block p-0 lg:mr-2 text-sm lg:text-lg lg:p-2 ml-2 lg:ml-0">
                  <FontAwesomeIcon
                    className="ml-2 w-8 mr-1 lg:ml-0"
                    icon={faBook}
                  />
                  Rules
                </div>
              </div>
            </Link>

            <Link href="/profile">
              <div className="hover:bg-gray-500 p-2 rounded-lg text-white">
                <div className="inline-block p-0 lg:mr-2 text-sm lg:text-lg lg:p-2 ml-2 lg:ml-0">
                  <FontAwesomeIcon
                    className="ml-1 w-8 mr-1 lg:ml-0"
                    icon={faUser}
                  />
                  Profile
                </div>
              </div>
            </Link>
          </div>

          <div>
            {session ? (
              <div className="text-white mr-16 flex justify-end">
                <span className="mr-4 ">
                  Logged in as{" "}
                  <span className="underline text-sky-300">
                    {session.user?.email}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:underline text-rose-400"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="text-white flex items-center justify-end mr-16">
                <span className="mr-4">You are Logged Out!</span>
                <span className="mr-4">
                  <DefaultButton inserttext="Register" link="/register" />
                </span>
                <span className="mr-4">
                  <DefaultButton inserttext="Log In" link="/login" />
                </span>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Topnav;
