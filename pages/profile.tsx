import BottomBar from "../components/BottomBar";
import Topnav from "@/components/topnav";
import { createClient, Session } from "@supabase/supabase-js";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const supabase = createClient(
  "https://ttlaembyimpxjuovpmxk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw",
);

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState("/defaulticon.png");
  const [isImageLoading, setIsImageLoading] = useState(true);

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

    const profilePicURL = data![0].profilepic;
    setProfileImage(profilePicURL);
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
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false); // Triggered when the image has finished loading
  };

  useEffect(() => {
    SetImage();
    fetchSession().then(() => setIsLoading(false));
  }, []);

  if (session) {
    return (
      <div>
        <Topnav />
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        ;
        <div className="flex flex-col items-center shadow-lg rounded-3xl bg-slate-800 mb-5 h-[1150px] mt-32 w-3/5 px-5 mx-auto">
          <div className="text-white text-2xl text-center mt-12 shadow-lg rounded-3xl bg-slate-700 px-16">
            <div onClick={handleImageClick}>
              {<div className="spinner">Loading...</div>}
              <Image
                className={`inline-block ml-1 mr-3 hover:opacity-40 rounded-3xl mt-8 ${
                  isImageLoading ? "hidden" : ""
                }`}
                src={profileImage}
                alt="Logo"
                width={130}
                height={130}
                onLoad={handleImageLoad} // Corrected to use the handleImageLoad function
              />
            </div>

            {session && (
              <div className="text-white text-2xl text-center mt-2 font-bold inline-block mt-16 mt-4">
                Profile of -{" "}
                <span className="text-sky-300">
                  {session.user?.email || "Guest"}
                </span>
                <div className="text-[13px] mb-2 flex flex-col items-start ml-4 mt-4">
                  <div>
                    &gt; Elo - <span className="text-sky-300">870</span>
                  </div>
                  <div>
                    &gt; Last Online -{" "}
                    <span className="text-sky-300">15th Nov 2023</span>
                  </div>
                  <div>
                    &gt; Joined -{" "}
                    <span className="text-sky-300">15th Jan 2023</span>
                  </div>
                </div>
              </div>
            )}
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
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4">
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
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4">
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
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4">
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
            <div className="flex items-left shadow-lg rounded-3xl bg-slate-600 mt-4">
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

        <div className="text-white font-bold flex flex-col items-center shadow-lg rounded-3xl bg-slate-800 mb-5 h-[250px] mt-32 w-2/5 px-5 mx-auto">
          <div className="mt-24 text-2xl">
            You need to be logged in to view your profile
          </div>
        </div>

        <BottomBar />
      </div>
    );
  }
};

export default Profile;
