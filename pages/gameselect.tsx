const gameselect = () => {
    return(
        <div className="flex justify-center items-center h-screen">

            
<div className="grid grid-cols-2 gap-32">

    <div className="text-white">
        <p className="text-6xl underline text-left">Betting Guidelines</p>
        <br></br>
        <p className="">Select Betting amount and then select game. Note : If you choose wife, she will be immediately kidnapped until end of game.</p>
        <br></br>
        <p className="text-6xl underline text-left">ELO Max Bets</p>
        <br></br>
    </div>    

    

    <div className="mx-auto my-10 grid grid-cols-3 gap-3">

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">$1.50</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">$2.50</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">$5</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">$10</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">$15</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">$20</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">Car</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">Boat</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-4xl">Wife</p>
        </div>
        
    </div>
    </div>
        
        
        
        </div>
    )
}

export default gameselect