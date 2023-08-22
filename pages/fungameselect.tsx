import { useState } from "react";
import {DefaultButton, GridButton } from "../components/StyledButton";

const Fungameselect = () => {

    const [highlightedButton, setHighlightedButton] = useState('');
    const [highlightedButton2, setHighlightedButton2] = useState('');
    const [textholder, settextholder] = useState('<Select a Bet Amount>');
    const [textholder2, settextholder2] = useState('<Select a Game Mode');

return (

<div className="flex justify-center items-center h-screen">

    <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center">
            <div className="text-white text-center">
            <p className="text-6xl underline">Play For Fun</p>
            <br></br>
            <p className="text-xl">The following game mode is simply casual play with no Elo or Betting.<br></br>
            You will be paired with any random player</p>

            <br></br>
            <br></br>
        </div>    
    </div>
    
    <div className="text-white px-32"> 
        <p className="text-4xl underline text-center mb-4 ">Select Bet and Game</p>
    </div>

<div className="grid grid-cols-3 gap-2">

    <GridButton 
    inserttext="$1.50" 
    highlighted={highlightedButton === '1'}
    onClick={(text) => {
        setHighlightedButton('1');
        settextholder(text)
      }} 
    />

    <GridButton 
    inserttext="$2.50" 
    highlighted={highlightedButton === '2'}
    onClick={(text) => {
        setHighlightedButton('2');
        settextholder(text)
      }} 
    />

    <GridButton 
    inserttext="$5" 
    highlighted={highlightedButton === '3'}
    onClick={(text) => {
        setHighlightedButton('3');
        settextholder(text)
      }} 
    />

<GridButton 
    inserttext="$10" 
    highlighted={highlightedButton === '4'}
    onClick={(text) => {
        setHighlightedButton('4');
        settextholder(text)
      }} 
/>

<GridButton 
    inserttext="$5" 
    highlighted={highlightedButton === '5'}
    onClick={(text) => {
        setHighlightedButton('5');
        settextholder(text)
      }} 
/>

<GridButton 
    inserttext="$20" 
    highlighted={highlightedButton === '6'}
    onClick={(text) => {
        setHighlightedButton('6');
        settextholder(text)
      }} 
/>

<GridButton 
    inserttext="Car" 
    highlighted={highlightedButton === '7'}
    onClick={(text) => {
        setHighlightedButton('7');
        settextholder(text)
      }} 
/>

<GridButton 
    inserttext="Boat" 
    highlighted={highlightedButton === '8'}
    onClick={(text) => {
        setHighlightedButton('8');
        settextholder(text)
      }} 
/>

<GridButton 
    inserttext="Wife" 
    highlighted={highlightedButton === '9'}
    onClick={(text) => {
        setHighlightedButton('9');
        settextholder(text)
      }} 
/>
    
</div>

    
    </div>
</div>
    )
}

export default Fungameselect