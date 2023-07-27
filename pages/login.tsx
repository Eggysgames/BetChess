import {DefaultButton } from "../components/StyledButton";

const register = () => {
    return(
        <div className="flex justify-center items-center h-screen">

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">

            <p className="underline text-4xl">Login</p>
         
            <div className="mx-auto my-10 max-w-md grid grid-cols-3 gap-3">
                <span className="flex items-center justify-end">Username :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="text" placeholder="<Enter Username>" />
                </div>

                <span className="flex items-center justify-end">Password :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="password" placeholder="<Enter Password>" />
                </div>

                
            </div>
            

            
            <DefaultButton inserttext="Login" link="/chessgame"/>

            </div>
        </div>
    )

}

export default register