import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Card, { Player } from "./Card";
import players from "../data/players.json";
import {
  ArrowCircleRightOutlined,
  ArrowCircleLeftOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface DeckProps {
  team: string;
  collectedCards: Set<string>;
  scannedCard?: string | null;
  setScannedCard?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Deck({
  team,
  collectedCards,
  scannedCard,
  setScannedCard,
}: DeckProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const roster = players.filter((player: Player) => player.team === team);

  useEffect(() => {
    if (scannedCard) {
      const index = roster.findIndex((card: Player) => card.id === scannedCard);
      if (index !== -1) {
        setCurrentCard(index);
      }
    }
  }, [team, scannedCard, roster]);

  const handlePrev = () => {
    if (scannedCard && setScannedCard) {
      setScannedCard(null);
    }
    setCurrentCard((prev) => (prev > 0 ? prev - 1 : roster.length - 1));
  };

  const handleNext = () => {
    if (scannedCard && setScannedCard) {
      setScannedCard(null);
    }
    setCurrentCard((prev) => (prev < roster.length - 1 ? prev + 1 : 0));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handlePrev(),
    onSwipedRight: () => handleNext(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="w-full mx-auto">
      <div
        {...swipeHandlers}
        className="relative flex justify-center w-full overflow-hidden h-[400px]"
      >
        {roster.map((card, id) => {
          const isVisible =
            id === currentCard ||
            id === (currentCard + 1) % roster.length ||
            id === (currentCard + 2) % roster.length ||
            id === (currentCard - 1 + roster.length) % roster.length ||
            id === (currentCard - 2 + roster.length) % roster.length;

          if (!isVisible) {
            return null;
          }

          return (
            <div
              key={card.id}
              className={`absolute transition-transform duration-500 ease-in-out transform
          ${id === currentCard ? "scale-100 z-10 opacity-100 shadow-2xl" : ""}
          ${
            id === currentCard - 1 ||
            (currentCard === 0 && id === roster.length - 1)
              ? "translate-x-[-250px] scale-75 opacity-50 z-0"
              : ""
          }
          ${
            id === currentCard + 1 ||
            (currentCard === roster.length - 1 && id === 0)
              ? "translate-x-[250px] scale-75 opacity-50 z-0"
              : ""
          }
          ${
            id < currentCard - 1
              ? "translate-x-[-500px] scale-50 opacity-25 z-0"
              : ""
          }
          ${
            id > currentCard + 1
              ? "translate-x-[500px] scale-50 opacity-25 z-0"
              : ""
          }`}
            >
              <Card
                player={card}
                active={currentCard === id}
                collected={collectedCards.has(card.number)}
              />
            </div>
          );
        })}
      </div>
      <div className="relative flex justify-center mt-4 items-center">
        <IconButton onClick={handlePrev} aria-label="back" color="inherit">
          <ArrowCircleLeftOutlined fontSize="large" />
        </IconButton>
        <p className="text-xl font-bold inline-block w-48 text-center">
          {roster[currentCard].name}
        </p>
        <IconButton onClick={handleNext} aria-label="next" color="inherit">
          <ArrowCircleRightOutlined fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
