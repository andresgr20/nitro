import { useEffect, useState } from "react";
import Deck from "./components/Deck";
import TeamSelectorButton from "./components/TeamSelectorButton";
import { initGA, logPageView } from "./analytics";

const teamSelectorEnabled = false;

type Team = {
  title: string;
  description: string;
};
const teams: Record<string, Team> = {
  nitro: {
    title: "Nitro",
    description:
      "Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.",
  },
  tundra: {
    title: "tundra",
    description:
      "Beep beep, well if it ain't the frostiest bitches of the True North! Tundra's comin' down to Austin to bring a blizzard and a ball!",
  },
  polaris: {
    title: "polaris",
    description:
      "Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.",
  },
};

// show the collected cards
function App() {
  const [selectedTeam, setSelectedTeam] = useState<keyof typeof teams>("nitro");
  const [collectedCards, setCollectedCards] = useState<Set<string>>(new Set());
  const [scannedCard, setScannedCard] = useState<string | null>(null);

  useEffect(() => {
    initGA("G-7Z534Q6P03");
    logPageView();
    let storedCards = localStorage.getItem("collectedCards");
    storedCards = storedCards ? JSON.parse(storedCards) : [];

    setCollectedCards(new Set(storedCards));
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get("cardId");
    if (cardId) {
      const updatedCards = new Set(storedCards);
      if (!updatedCards.has(cardId)) {
        updatedCards.add(cardId);
        localStorage.setItem(
          "collectedCards",
          JSON.stringify(Array.from(updatedCards))
        );
        setCollectedCards(updatedCards);
      }
      setScannedCard(cardId);
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <div className="bg-nitro min-h-screen flex flex-col items-center">
      <div className="text-6xl md:text-5xl sm:text-4xl mt-4 font-bold uppercase py-4">
        Northstars {teams[selectedTeam].title}
      </div>
      <div className="sm:text-base my-2 text-center px-4">
        <p className="text-xl">{teams[selectedTeam].description} </p>
      </div>

      {teamSelectorEnabled && (
        <TeamSelectorButton
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
        />
      )}
      <div className="w-screen flex justify-center mt-10">
        <Deck
          team={selectedTeam}
          collectedCards={collectedCards}
          scannedCard={scannedCard}
          setScannedCard={setScannedCard}
        />
      </div>
      <div className="md:fixed bottom-0 w-full text-center py-2">
        <a
          href="https://www.linkedin.com/in/agarciar/"
          className="no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          © Andres Garcia
        </a>
      </div>
    </div>
  );
}

export default App;
