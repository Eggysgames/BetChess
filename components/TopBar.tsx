import Image from "next/image";

const TopBar = () => {
  return (
    <div className="bg-black text-white p-5 relative">
      <div className="text-3xl font-bold">
        <h1>betonchess.online</h1>
        <h2>betchess.online</h2>
      </div>

      
      <div className="absolute top-0 right-0 mt-5 mr-5">
        <Image className="opacity-90"
          src="/settingsicon.png"
          alt="SettingsIcon"
          width={70}
          height={70}
        />
      </div>
    </div>
  );
};

export default TopBar;
