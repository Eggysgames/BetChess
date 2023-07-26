import { StyledButton, DefaultButton } from "../components/StyledButton";

const cheatingpolicy = () => {
    return (

        <div className="my-10 mx-auto max-w-6xl px-32 py-8 bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 text-left">

        <article className="prose prose-2xl text-white max-w-none">

        <h1 className="text-white underline">Betting and Cheating Policy</h1>

        <p>
          Computers and computer-assisted players are not allowed to play. Please do not get assistance from chess engines, databases, or from 
          other players while playing. Also note that making multiple accounts is strongly discouraged and excessive multi-accounting will lead
          to being banned. You <b>must</b> follow these or else your <i>entire family bloodline will be wiped out</i>
        </p>

        <p>
          By registering, you agree to be bound by our Terms of Service. Additionally please read our Privacy Policy.
        </p>

        <p><b>If you are suspected of cheating, your account is frozen and will be thoroughly reviewed</b></p>

        <p>If we conclude cheating has occurred -</p>

      <ul>
        <li>Your family will be hunted down for sport</li>
        <li>Your face will be posted to every news site as a cheater</li>
        <li>You will be posted on the wall of shame we use as a dartboard</li>
        <li>A curse will be cast upon you</li>
      </ul>
        
        
          <p>--- FAQ ----</p>
        <blockquote className="text-left text-slate-400">
          <p>Why was my account banned?</p>
        </blockquote>
        <p>Because fuck you thats why</p>
        <blockquote className="text-left text-slate-400">
          <p>Can I do any kind of favours to get it back ;)</p>
        </blockquote>
        <p>Only if you are Jessica Alba</p>
        <blockquote className="text-left text-slate-400">
          <p>Please unban me</p>
        </blockquote>
        <p>No</p>
        <br /><br />

        

      </article>
      
      <StyledButton
                inserttext="Return Home"
                link="/"
                colour="bg-teal-500"
                hover="hover:bg-teal-700"
                textsize="text-2xl"
              />

      </div>
    ); 
  }

  export default cheatingpolicy