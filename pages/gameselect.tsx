import {DefaultButton, GridButton } from "../components/StyledButton";


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
    
    <div className="text-white px-32"> 

    <p className="text-4xl underline text-center mb-4 ">Select Bet and Game</p>

    <div className="grid grid-cols-3 gap-2">

        <GridButton inserttext="$1.50"></GridButton>

        <GridButton inserttext="$2"></GridButton>

        <GridButton inserttext="$5"></GridButton>

        <GridButton inserttext="$10"></GridButton>

        <GridButton inserttext="$20"></GridButton>

        <GridButton inserttext="$50"></GridButton>

        <GridButton inserttext="Car"></GridButton>

        <GridButton inserttext="Boat"></GridButton>

        <GridButton inserttext="Wife"></GridButton>
        
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
    

    <div className="px-32 my-10 grid grid-cols-3 gap-2 col-start-2">
        
        
        <GridButton inserttext="Blitz" inserttext2="3+2"></GridButton>
    
        <GridButton inserttext="Blitz" inserttext2="5+0"></GridButton>

        <GridButton inserttext="Blitz" inserttext2="5+3"></GridButton>

        <GridButton inserttext="Rapid" inserttext2="10+0"></GridButton>

        <GridButton inserttext="Rapid" inserttext2="10+5"></GridButton>

        <GridButton inserttext="Rapid" inserttext2="15+10"></GridButton>

        <GridButton inserttext="Classical" inserttext2="20+10"></GridButton>

        <GridButton inserttext="Classical" inserttext2="30+0"></GridButton>

        <GridButton inserttext="Classical" inserttext2="60+0"></GridButton>
        
    </div>


    </div>
        
</div>

    )
}

export default gameselect