import BottomBar from "../components/BottomBar";
import Topnav from "@/components/topnav";
import { createClient, Session } from "@supabase/supabase-js";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Profile = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState("____");

  const fetchSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    setSession(sessionData?.session || null);
  };

  const SetImage = async () => {
    const userID = (await supabase.auth.getUser()).data.user?.id;
    const { data } = await supabase
      .from("user_profile")
      .select("profilepic")
      .eq("id", userID);

    if (data && data.length > 0 && data[0].profilepic) {
      const profilePicURL = data[0].profilepic;
      setProfileImage(profilePicURL);
    }
  };

  const insertProfilepic = async (userID: any, profilePicURL: string) => {
    await supabase.from("user_profile").upsert([
      {
        id: userID,
        profilepic: profilePicURL,
      },
    ]);
  };

  const handleImageUpload = async () => {
    setIsUploading(true);
    const id = (await supabase.auth.getUser()).data.user?.id;
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      return;
    }

    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${Date.now()}.${fileExtension}`;

    const { data } = await supabase.storage
      .from("chessimages")
      .upload(uniqueFilename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      const imagePath = data.path;
      const imageUrl = `https://ttlaembyimpxjuovpmxk.supabase.co/storage/v1/object/public/chessimages/${imagePath}`;
      setProfileImage(imageUrl);
      await insertProfilepic(id, imageUrl);
      setIsUploading(false);
      router.reload();
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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

  useEffect(() => {
    GrabUsername();
    SetImage();
    fetchSession().then(() => setIsLoading(false));
  }, []);

  if (session) {
    return (
      <div>
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        ;
        <div className="lg:flex lg:flex-col lg:items-center shadow-lg rounded-3xl lg:bg-slate-800 lg:mb-5 lg:h-[1050px] mt-32 lg:w-[850px] px-5 mx-auto">
          <div className="text-white text-2xl text-center mt-12 shadow-lg rounded-3xl bg-slate-700 lg:px-16 lg:flex">
            <div onClick={handleImageClick}>
              {isUploading ? (
                <Image
                  className="inline-block mr-3 hover:opacity-40 rounded-3xl mt-8 animate-spin h-28 w-28 mr-8"
                  src="loading.png"
                  alt="Loading"
                  width={130}
                  height={130}
                  unoptimized={true}
                />
              ) : profileImage ? (
                <div className="lg:relative">
                  <div className="group inline-block relative">
                    <Image
                      className="rounded-3xl mt-8 h-28 w-28 lg:mr-8"
                      src={profileImage}
                      alt="Logo"
                      width={130}
                      height={130}
                      unoptimized={true}
                    />
                    <span className="opacity-0 absolute bottom-1 left-2 bg-black text-white text-xs py-1 px-2 rounded-md transition-opacity duration-300 pointer-events-none select-none group-hover:opacity-80">
                      Change Picture
                    </span>
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
            </div>

            {session && (
              <div className="text-white text-2xl mt-2 font-bold inline-block mt-16 mt-4">
                Profile of -{" "}
                <span className="text-sky-300 text-left lg:mr-16">
                  {username}
                </span>
                <div className="text-[13px] mb-2 flex flex-col items-start lg:ml-4 mt-4 ml-16">
                  <div>
                    &gt; Elo - <span className="text-sky-300">1200</span>
                  </div>
                  <div>
                    <span>&gt; Last Online - </span>
                    <span className="text-sky-300">
                      {session.user && session.user.last_sign_in_at && (
                        <span>
                          {new Date(
                            session.user.last_sign_in_at,
                          ).toLocaleString()}
                        </span>
                      )}
                    </span>
                  </div>
                  <div>
                    &gt; Joined -{" "}
                    <span className="text-sky-300">
                      {new Date(session.user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-white lg:text-2xl text-sm text-center mt-8 shadow-lg rounded-3xl bg-slate-700 lg:px-16 py-2 lg:h-[650px] lg:w-[600px] font-bold">
            <div className="mt-4"> Recent Games</div>
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-7 ml-2 mr-2 lg:ml-0 lg:mr-0">
              <div className="mb-4 mt-4">
                <Image
                  className="inline-block lg:ml-5 lg:mr-4 ml-2"
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
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4 ml-2 mr-2 lg:ml-0 lg:mr-0">
              <div className="mb-4 mt-4 ">
                <Image
                  className="inline-block lg:ml-5 lg:mr-4 ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-sky-300">Eggy</span>{" "}
                <span className="text-red-500 mr-2">vs</span>
                <span className="text-sky-300">Marty</span>
                <Image
                  className="inline-block ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-md ml-2 text-red-200">13th Nov 2023</span>
              </div>
            </div>
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4 ml-2 mr-2 lg:ml-0 lg:mr-0">
              <div className="mb-4 mt-4">
                <Image
                  className="inline-block lg:ml-5 lg:mr-4 ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-sky-300">Eggy</span>{" "}
                <span className="text-red-500 mr-2">vs</span>
                <span className="text-sky-300">Marty</span>
                <Image
                  className="inline-block ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-md ml-2 text-red-200">13th Nov 2023</span>
              </div>
            </div>
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4 ml-2 mr-2 lg:ml-0 lg:mr-0">
              <div className="mb-4 mt-4">
                <Image
                  className="inline-block lg:ml-5 lg:mr-4 ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-sky-300">Eggy</span>{" "}
                <span className="text-red-500 mr-2">vs</span>
                <span className="text-sky-300">Marty</span>
                <Image
                  className="inline-block ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-md ml-2 text-red-200">13th Nov 2023</span>
              </div>
            </div>
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4 ml-2 mr-2 lg:ml-0 lg:mr-0">
              <div className="mb-4 mt-4">
                <Image
                  className="inline-block lg:ml-5 lg:mr-4 ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-sky-300">Eggy</span>{" "}
                <span className="text-red-500 mr-2">vs</span>
                <span className="text-sky-300">Sam</span>
                <Image
                  className="inline-block ml-2"
                  src="/defaulticon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-md ml-2 text-red-200">11th Nov 2023</span>
              </div>
            </div>
            <div className="mt-8 underline text-sky-400">More Games</div>
          </div>
        </div>
        <BottomBar />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div>Loading......</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <Topnav />

        <div className="text-white font-bold  text-center lg:flex lg:flex-col items-center shadow-lg rounded-3xl bg-slate-800 lg:mb-5 lg:h-[250px] p-6  mt-32 lg:w-2/5 w-4/5 mx-auto">
          <div className="lg:mt-24 text-2xl">
            You need to be logged in to view your profile
          </div>
        </div>

        <BottomBar />
      </div>
    );
  }
};

export default Profile;
