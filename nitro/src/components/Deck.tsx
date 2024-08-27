import { useState } from "react";
import Card from "./Card";
import CardInfo from '../data/players.json';
import '../css/Deck.css';

export default function Deck(){
    const [currentCard,setCurrentCard] = useState(0);

    const handlePrev = () => {
        setCurrentCard( (prev) => (prev > 0 ? prev - 1 : CardInfo.length - 1))
    }

    const handleNext = () => {
        setCurrentCard((prev) => (prev < CardInfo.length - 1 ? prev + 1: 0))
    }

    return (
        <div className="deck-container">
            <button onClick={handlePrev} className='deck-button'>Back</button>
            <div className="deck-cards">
                {CardInfo.map((card,id) => 
                Math.abs(id - currentCard) <= 1 && (
                <div key={card.id}
                    className={`deck-card ${id == currentCard ? 'active' : ''} ${id < currentCard ?  'left' : ''} ${id > currentCard ? 'right' : ''}`}
                    >
                        <Card player={card} active={currentCard == id} />
                </div>
                )
                )}
            </div>
            <button onClick={handleNext} className='deck-button'>Next</button>
        </div>
    )
}