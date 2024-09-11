import { useState } from "react";
import Card from "./Card";
import NitroInfo from '../data/nitro.json'
import TundraInfo from '../data/tundra.json'
import PolarisInfo from '../data/polaris.json';
import { ArrowCircleRightOutlined, ArrowCircleLeftOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface DeckProps{
    team: number
}

export default function Deck({team}: DeckProps){
    const [currentCard,setCurrentCard] = useState(0);
    const rosterInfo = [NitroInfo,TundraInfo,PolarisInfo]

    const handlePrev = () => {
        setCurrentCard( (prev) => (prev > 0 ? prev - 1 : rosterInfo[team].length - 1))
    }

    const handleNext = () => {
        setCurrentCard((prev) => (prev < rosterInfo[team].length - 1 ? prev + 1: 0))
    }
    
    return (
        <div className="w-full mx-auto">
        <div className="relative flex justify-center w-full overflow-hidden h-[400px]">
        {rosterInfo[team].map((card, id) => {

    const isVisible = 
      id === currentCard ||
      id === (currentCard + 1) % rosterInfo[team].length ||
      id === (currentCard + 2) % rosterInfo[team].length ||
      id === (currentCard - 1 + rosterInfo[team].length) % rosterInfo[team].length ||
      id === (currentCard - 2 + rosterInfo[team].length) % rosterInfo[team].length;

    if (!isVisible) {
      return null; 
    }

    return (
      <div
        key={card.id}
        className={`absolute transition-transform duration-500 ease-in-out transform
          ${id === currentCard ? 'scale-100 z-10 opacity-100' : ''}
          ${id === currentCard - 1 || (currentCard === 0 && id === rosterInfo[team].length - 1) ? 'translate-x-[-250px] scale-75 opacity-50 z-0' : ''}
          ${id === currentCard + 1 || (currentCard === rosterInfo[team].length - 1 && id === 0) ? 'translate-x-[250px] scale-75 opacity-50 z-0' : ''}
          ${id < currentCard - 1 ? 'translate-x-[-500px] scale-50 opacity-25 z-0' : ''}
          ${id > currentCard + 1 ? 'translate-x-[500px] scale-50 opacity-25 z-0' : ''}`}
      >
        <Card player={card} active={currentCard === id} />
      </div>
    );
  })}
  </div>
        <div className='relative flex justify-center mt-4 items-center' >
            <IconButton onClick={handlePrev} aria-label="back">
            <ArrowCircleLeftOutlined/>
            </IconButton>
            <p className="text-xl font-bold"> {rosterInfo[team][currentCard].name}</p>
            <IconButton onClick={handleNext} aria-label="next">
            <ArrowCircleRightOutlined/>
            </IconButton>
        </div>

        </div>
    )
}