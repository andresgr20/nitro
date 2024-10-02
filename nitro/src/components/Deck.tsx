import React, { useEffect, useRef, useState } from "react";
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
  showOnlyMissing: boolean;
  showAlternateImages: boolean;
}

export default function Deck({
  team,
  collectedCards,
  scannedCard,
  setScannedCard,
  showOnlyMissing,
  showAlternateImages,
}: DeckProps) {
  const [currentCard, setCurrentCard] = useState(0);
  let roster = players.filter((player: Player) => player.team === team);
  roster =
    showOnlyMissing && collectedCards.size > 0 && collectedCards.size < 20
      ? roster.filter((card: Player) => !collectedCards.has(card.id))
      : roster;

  useEffect(() => {
    if (scannedCard) {
      const index = roster.findIndex((card: Player) => card.id === scannedCard);
      if (index !== -1) {
        setCurrentCard(index);
      }
    }
    if (showOnlyMissing) {
      setCurrentCard(0);
    }
  }, [team, scannedCard, showOnlyMissing]);

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
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const getCardClasses = (id: number) => {
    const isCurrent = id === currentCard;
    const isPrev =
      id === (currentCard - 1 + roster.length) % roster.length &&
      roster.length > 1;
    const isNext =
      id === (currentCard + 1) % roster.length && roster.length > 1;
    const isTwoBefore = id < currentCard - 1;
    const isTwoAfter = id > currentCard + 1;

    return `
      absolute transition-transform duration-500 ease-in-out transform
      ${isCurrent ? "scale-100 z-10 opacity-100 shadow-2xl" : ""}
      ${isPrev ? "translate-x-[-250px] scale-75 opacity-50 z-0" : ""}
      ${isNext ? "translate-x-[250px] scale-75 opacity-50 z-0" : ""}
      ${isTwoBefore ? "translate-x-[-400px] scale-50 opacity-25 z-0" : ""}
      ${isTwoAfter ? "translate-x-[400px] scale-50 opacity-25 z-0" : ""}
    `;
  };

  return (
    <div className="w-full mx-auto">
      <div
        {...swipeHandlers}
        className="relative flex justify-center w-full overflow-hidden h-[400px]"
      >
        {roster.map((card, id) => {
          const isVisible =
            roster.length <= 4
              ? id === currentCard ||
                id === (currentCard + 1) % roster.length ||
                id === (currentCard - 1 + roster.length) % roster.length
              : id === currentCard ||
                id === (currentCard + 1) % roster.length ||
                id === (currentCard + 2) % roster.length ||
                id === (currentCard - 1 + roster.length) % roster.length ||
                id === (currentCard - 2 + roster.length) % roster.length;

          if (!isVisible) {
            return null;
          }

          return (
            <div key={card.id} className={getCardClasses(id)}>
              <Card
                player={card}
                active={currentCard === id}
                collected={collectedCards.has(card.id)}
                showAlternateImage={showAlternateImages}
              />
            </div>
          );
        })}
      </div>
      <div className="relative flex justify-center mt-4 items-center">
        <IconButton
          onClick={handlePrev}
          aria-label="back"
          color="inherit"
          disabled={roster.length === 1}
        >
          <ArrowCircleLeftOutlined fontSize="large" />
        </IconButton>
        <p className="text-xl font-bold inline-block w-48 text-center">
          {roster[currentCard]?.name}
        </p>
        <IconButton
          onClick={handleNext}
          aria-label="next"
          color="inherit"
          disabled={roster.length === 1}
        >
          <ArrowCircleRightOutlined fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
