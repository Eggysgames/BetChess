import Image from "next/image";

const TopBar = () => {
  return (
    <div className="bg-transparent text-white p-3 lg:relative">
      <div className="text-3xl font-bold text-center mt-28 lg:text-left lg:mt-0">
        <h1>betonchess.online</h1>
        <h2>betchess.online</h2>
      </div>

      {/* <div className="absolute top-0 right-0 mt-5 mr-5"> 
        <Image className="opacity-90"
          src="/settingsicon.png"
          alt="SettingsIcon"
          width={70}
          height={70}
        />
      </div>
      */}
    </div>
  );
};

export default TopBar;
