import { StyledButton, DefaultButton } from "../components/StyledButton";
import BottomBar from "../components/BottomBar";

const cheatingpolicy = () => {
  return (
    <div>
      <div className="lg:my-10 ml-8 mr-8 lg:mx-auto lg:max-w-3xl lg:px-32 lg:py-8 bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 lg:text-left text-center lg:mt-32 mt-28">
        <article className="prose prose-md text-white lg:max-w-none p-6 lg:p-0">
          <h1 className="text-white underline text-4xl">
            Betting and Cheating Policy
          </h1>

          <p>
            Computers and computer-assisted players are not allowed to play.
            Please do not get assistance from chess engines, databases, or from
            other players while playing. Also note that making multiple accounts
            is strongly discouraged and excessive multi-accounting will lead to
            being banned. You <b>must</b> follow these rules while using this
            website or it will result in an account ban.
          </p>

          <p>
            By registering, you agree to be bound by our Terms of Service.
            Additionally please read our Privacy Policy.
          </p>

          <p>
            <b>
              If you are suspected of cheating, your account is frozen and will
              be thoroughly reviewed
            </b>
          </p>

          <p>If we conclude cheating has occurred -</p>

          <ul>
            <li>
              All winnings will be forfeited and distributed to impacted players
            </li>
            <li>Your initial deposit will be refunded</li>
            <li>You will be permanently banned from the site</li>
            <li>
              Your name, as well as User ID, will be listed on the Banned
              Players Page
            </li>
          </ul>

          <p>--- FAQ ----</p>
          <blockquote className="text-left text-slate-400">
            <p>Can I dispute the ban?</p>
          </blockquote>
          <p>Yes, please submit an email to betchess@support.com</p>
          <blockquote className="text-left text-slate-400">
            <p>How is cheating detected?</p>
          </blockquote>
          <p>For security purposes we cannot give out this information</p>
          <blockquote className="text-left text-slate-400">
            <p>Do you use StockFish?</p>
          </blockquote>
          <p>
            Yes. All moves are run through Stockfish the best chess AI engine
            made
          </p>
          <br />
          <br />
        </article>

        <div className="p-8">
          <StyledButton
            inserttext="Return Home"
            link="/"
            colour="bg-teal-500"
            hover="hover:bg-teal-700"
            textsize="text-2xl"
          />
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default cheatingpolicy;
