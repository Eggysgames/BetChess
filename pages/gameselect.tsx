import { useState } from "react";
import {DefaultButton, GridButton } from "../components/StyledButton";


const Gameselect = () => {

    const [highlightedButton, setHighlightedButton] = useState('');
    const [highlightedButton2, setHighlightedButton2] = useState('');
    
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

    <GridButton 
        inserttext="$1.50" 
        highlighted={highlightedButton === '1'}
        onClick={() => setHighlightedButton('1')}
    />

    <GridButton
        inserttext="$2.50"
        highlighted={highlightedButton === '2'}
        onClick={() => setHighlightedButton('2')}
    />

    <GridButton
        inserttext="$5"
        highlighted={highlightedButton === '3'}
        onClick={() => setHighlightedButton('3')}
    />

    <GridButton
        inserttext="$10"
        highlighted={highlightedButton === '4'}
        onClick={() => setHighlightedButton('4')}
    />

    <GridButton
        inserttext="$15"
        highlighted={highlightedButton === '5'}
        onClick={() => setHighlightedButton('5')}
    />

    <GridButton
        inserttext="$20"
        highlighted={highlightedButton === '6'}
        onClick={() => setHighlightedButton('6')}
    />

    <GridButton
        inserttext="Car"
        highlighted={highlightedButton === '7'}
        onClick={() => setHighlightedButton('7')}
    />

    <GridButton
        inserttext="Boat"
        highlighted={highlightedButton === '8'}
        onClick={() => setHighlightedButton('8')}
    />

    <GridButton
        inserttext="Wife"
        highlighted={highlightedButton === '9'}
        onClick={() => setHighlightedButton('9')}
    />
        
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
        
    <GridButton
        inserttext="Blitz"
        inserttext2="3+2"
        highlighted={highlightedButton2 === '1'}
        onClick={() => setHighlightedButton2('1')}
    />
    
    <GridButton
        inserttext="Blitz"
        inserttext2="5+0"
        highlighted={highlightedButton2 === '2'}
        onClick={() => setHighlightedButton2('2')}
    />

    <GridButton
        inserttext="Blitz"
        inserttext2="5+3"
        highlighted={highlightedButton2 === '3'}
        onClick={() => setHighlightedButton2('3')}
    />

    <GridButton
        inserttext="Rapid"
        inserttext2="10+0"
        highlighted={highlightedButton2 === '4'}
        onClick={() => setHighlightedButton2('4')}
    />

    <GridButton
        inserttext="Rapid"
        inserttext2="10+5"
        highlighted={highlightedButton2 === '5'}
        onClick={() => setHighlightedButton2('5')}
    />

    <GridButton
        inserttext="Rapid"
        inserttext2="15+10"
        highlighted={highlightedButton2 === '6'}
        onClick={() => setHighlightedButton2('6')}
    />

    <GridButton
        inserttext="Classical"
        inserttext2="20+0"
        highlighted={highlightedButton2 === '7'}
        onClick={() => setHighlightedButton2('7')}
    />

    <GridButton
        inserttext="Classical"
        inserttext2="30+0"
        highlighted={highlightedButton2 === '8'}
        onClick={() => setHighlightedButton2('8')}
    />

    <GridButton
        inserttext="Classical"
        inserttext2="60+0"
        highlighted={highlightedButton2 === '9'}
        onClick={() => setHighlightedButton2('9')}
    />
        
    </div>


    </div>
        
</div>

    )
}

export default Gameselect