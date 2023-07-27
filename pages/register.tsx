import {DefaultButton } from "../components/StyledButton";

const register = () => {
    return(
        <div className="flex justify-center items-center h-screen">

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">

            <p className="underline text-4xl">Registration</p>
         
            <div className="mx-auto my-10 max-w-md grid grid-cols-3 gap-3">
                <span className="flex items-center justify-end">Username :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="text" placeholder="<Enter Username>" />
                </div>

                <span className="flex items-center justify-end">Password :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="password" placeholder="<Enter Password>" />
                </div>

                <span className="flex items-center justify-end">Email :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="email" placeholder="<Enter Email>" />
                </div>
            </div>
            

            <p className="text-sm">Computers and computer-assisted players are not allowed to play. Please do not get assistance from chess engines, databases, or from 
          other players while playing. Also note that making multiple accounts is strongly discouraged and excessive multi-accounting will lead
          to being banned. </p>
            <br></br>

            <p className="text-sm underline"> By Registering, you agree to be bound by our{" "}
            <br></br>
            <a href="/cheatingpolicy"
                className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline"
                target="_blank"
            >
                Terms of Service and Cheating Policy
            </a>
            </p>
            
            <br></br>

            <input
                type="checkbox"
                className="form-checkbox text-indigo-600 h-5 w-5 rounded focus:ring-indigo-500 border-gray-300"
            />

            <span className="ml-2 text-md">I have read and agree to the Terms of Service</span>

            <br></br><br></br>
            <DefaultButton inserttext="Register" link="/chessgame"/>

            </div>
        </div>
    )

}

export default register