import {DefaultButton } from "../components/StyledButton";

const gameselect = () => {
    return(
        <div className="flex justify-center items-center h-screen">

            
<div className="grid grid-cols-2 gap-2">

 <div className="flex items-center justify-center">
    <div className="text-white text-center">
        <p className="text-6xl underline">Betting Guidelines</p>
        <br></br>
        <p className="text-xl">Select Betting amount and then select game. <br></br>
        Note : If you choose wife, she will be immediately kidnapped until end of game.</p>
        <p className="text-xl">Once a game has begun after the 2nd move, bets are locked in. </p>
        <p className="text-xl">Make sure you choose carefully before pressing begin game</p>
        <br></br>
        <p className="text-xl">We are not liable for angry wives.</p>
        <br></br>
        <br></br>
        
    </div>    
</div>
    
    <div className="text-white mx-auto"> 

    <p className="text-4xl underline text-center mb-4">Betting Guidelines</p>

    <div className="mx-auto grid grid-cols-3 gap-2">

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
    <br></br>
    <hr />
    </div>   
        
    <div className="text-white text-center">
    <p className="text-6xl underline">ELO Max Bets</p>
        <br></br>
        <p className="text-2xl">Under 1000 - Max Bet $5</p>
        <p className="text-2xl">Under 1001 - 1200 - Max Bet $10</p>
        <p className="text-2xl">Under 1201 - 1500 - Max Bet $15</p>
        <p className="text-2xl">1501+ - Max Bet $20</p>
        <br></br>
        <br></br>
        <DefaultButton inserttext="Begin Game" link="/chessgame"/>
    </div>
    

    <div className="mx-auto my-10 grid grid-cols-3 gap-2 col-start-2">
        

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Blitz</p>
            <p className="text-2xl">3+2</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Blitz</p>
            <p className="text-2xl">5+0</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Blitz</p>
            <p className="text-2xl">5+3</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Rapid</p>
            <p className="text-2xl">10+0</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Rapid</p>
            <p className="text-2xl">10+5</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Rapid</p>
            <p className="text-2xl">15+10</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Classical</p>
            <p className="text-2xl">20+0</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Classical</p>
            <p className="text-2xl">30+0</p>
        </div>

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">
            <p className="text-2xl">Classical</p>
            <p className="text-2xl">60+0</p>
        </div>
        
    </div>

    

    </div>
        
        </div>
    )
}

export default gameselect