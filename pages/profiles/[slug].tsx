import BottomBar from "@/components/BottomBar";
import { createClient, Session } from "@supabase/supabase-js";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Userprofile = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [userID, setuserID] = useState("");
  const [createdat, setCreatedAt] = useState("");
  const [lastlogin, setLastLogin] = useState("");
  const [loading, setLoading] = useState(true);
  const capitalizedSlug =
    typeof slug === "string"
      ? slug.charAt(0).toUpperCase() + slug.slice(1)
      : "";

  const GeUserIDByUsername = useCallback(
    async (username: any) => {
      const { data } = await supabase
        .from("user_profile")
        .select("id")
        .ilike("username", username);

      if (data && data.length > 0) {
        setuserID(data[0].id);
      }
    },
    [setuserID],
  );

  const GetProfilepicByUsername = useCallback(
    async (username: any) => {
      const { data } = await supabase
        .from("user_profile")
        .select("profilepic")
        .ilike("username", username);

      if (data && data.length > 0) {
        setProfileImage(data[0].profilepic);
      }
    },
    [setProfileImage],
  );

  const GetCreatedAt = useCallback(
    async (username: any) => {
      const { data } = await supabase
        .from("user_profile")
        .select("created_at")
        .ilike("username", username);

      if (data && data.length > 0) {
        setCreatedAt(data[0].created_at);
      }
    },
    [setCreatedAt],
  );

  const GetLastLogin = useCallback(
    async (username: any) => {
      const { data } = await supabase
        .from("user_profile")
        .select("last_login")
        .ilike("username", username);

      if (data && data.length > 0) {
        setLastLogin(data[0].last_login);
      }
    },
    [setLastLogin],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        setLoading(true);
        await GetCreatedAt(slug);
        await GetLastLogin(slug);
        await GeUserIDByUsername(slug);
        await GetProfilepicByUsername(slug);
        setLoading(false);
      }
    };

    fetchData();
  }, [
    GeUserIDByUsername,
    GetProfilepicByUsername,
    slug,
    GetCreatedAt,
    GetLastLogin,
  ]);

  if (userID) {
    return (
      <div>
        <div className="flex flex-col items-center shadow-lg rounded-3xl bg-slate-800 mb-5 h-[1150px] mt-32 w-3/5 px-5 mx-auto">
          <div className="text-white text-2xl text-center mt-12 shadow-lg rounded-3xl bg-slate-700 px-16 flex">
            {profileImage ? (
              <div className="relative">
                <div className="group inline-block relative">
                  <Image
                    className="rounded-3xl mt-8 h-28 w-28 mr-8"
                    src={profileImage}
                    alt="Logo"
                    width={130}
                    height={130}
                    unoptimized={true}
                  />
                </div>
              </div>
            ) : (
              <Image
                className="inline-block mr-3 hover:opacity-40 rounded-3xl mt-8 animate-spin h-28 w-28 mr-8"
                src="/loading.png"
                alt="Loading"
                width={130}
                height={130}
                unoptimized={true}
              />
            )}

            <div className="text-white text-2xl mt-2 font-bold inline-block mt-16 mt-4">
              Profile of -{" "}
              <span className="text-sky-300 text-left mr-16">
                {capitalizedSlug}
              </span>
              <div className="text-[13px] mb-2 flex flex-col items-start ml-4 mt-4">
                <div>
                  &gt; Elo - <span className="text-sky-300">1200</span>
                </div>
                <div>
                  <span>&gt; Last Online - </span>
                  <span className="text-sky-300">
                    {new Date(lastlogin).toLocaleString()}
                  </span>
                </div>
                <div>
                  &gt; Joined -{" "}
                  <span className="text-sky-300">
                    {new Date(createdat).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white text-2xl text-center mt-8 shadow-lg rounded-3xl bg-slate-700 px-16 h-[650px] w-[600px] font-bold">
            <div className="mt-4"> Recent Games</div>
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-7">
              <div className="mb-4 mt-4">
                <Image
                  className="inline-block ml-5 mr-4"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-sky-300">Eggy</span>{" "}
                <span className="text-red-500 mr-2">vs</span>
                <span className="text-sky-300">Guest</span>
                <Image
                  className="inline-block ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-md ml-2 text-red-200">15th Nov 2023</span>
              </div>
            </div>

            <div className="mt-8 underline text-sky-400">More Games</div>
          </div>
        </div>
        <BottomBar />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex flex-col items-center shadow-lg rounded-3xl bg-slate-800 mb-5 h-[150px] mt-32 w-2/5 px-5 mx-auto">
        <Image
          className="inline-block mr-3 hover:opacity-40 rounded-3xl mt-8 animate-spin h-28 w-28 mr-8"
          src="/loading.png"
          alt="Loading"
          width={130}
          height={130}
          unoptimized={true}
        />
      </div>
    );
  }
  if (!userID) {
    return (
      <div className="flex flex-col items-center shadow-lg rounded-3xl bg-slate-800 mb-5 h-[150px] mt-32 w-2/5 px-5 mx-auto">
        <div className="text-white text-center text-4xl mt-14">
          User does not exist!
        </div>
      </div>
    );
  }
};

export default Userprofile;
