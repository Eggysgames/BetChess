import { StyledButton, DefaultButton } from "../components/StyledButton";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import Topnav from "@/components/topnav";

const Profile = () => {
  return (
    <div>
      <Topnav />

      <div className="text-white text-2xl text-center mt-32 font-bold">
        Welcome to your profile
      </div>

      <BottomBar />
    </div>
  );
};

export default Profile;
