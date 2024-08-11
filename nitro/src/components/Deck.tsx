import { useState } from "react";
import Card from "./Card";
import CardInfo from '../data/players.json';
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
        </div>
    )
}