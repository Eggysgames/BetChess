import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient, Session } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  faEgg,
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
    localStorage.removeItem("authToken"); // Remove the authentication token from local storage
    setSession(null);
    router.reload();
  };

  return (
    <div>
      <header className="bg-gray-700 text-white lg:p-1 fixed w-full top-0 z-10 opacity-100 shadow-md">
        <div className="mx-auto">
          <nav className="lg:flex">
            <Image
              className="items-left justify-center object-fill hidden lg:block ml-8"
              src="/pawn.svg"
              alt="Logo"
              width={60}
              height={60}
            />

            <div className="flex items-center justify-center mx-auto font-bold">
              <ul className="flex text-black">
                <Image
                  className="items-left justify-left lg:hidden"
                  src="/eggysgameslogo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />

                <li>
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
                </li>

                <li>
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
                </li>

                <li>
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
                </li>

                <li>
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
                </li>
              </ul>
            </div>
            {session ? (
              <div className="text-white flex items-center justify-right mr-8 w-100">
                <span className="mr-4 ">
                  Logged in as{" "}
                  <span className="underline">{session.user?.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="text-white flex items-center justify-right mr-8">
                <span className="">You are Logged Out!</span>
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Topnav;
