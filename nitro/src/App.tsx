import { useEffect, useState } from "react";
import Deck from "./components/Deck";
import TeamSelectorButton from "./components/TeamSelectorButton";
import { initGA, logPageView } from "./analytics";
import { Checkbox } from "@mui/material";
import players from "data/players.json";

const teamSelectorEnabled = false;

type Team = {
  title: string;
  description: string;
  background: string;
};
const teams: Record<string, Team> = {
  nitro: {
    title: "Nitro",
    description:
      "Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.",
    background: "bg-nitro",
  },
  tundra: {
    title: "Tundra",
    description:
      "Beep beep, well if it ain't the frostiest bitches of the True North! Tundra's comin' down to Austin to bring a blizzard and a ball!",
    background: "bg-tundra",
  },
  polaris: {
    title: "Polaris",
    description:
      "Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.",
    background: "bg-polaris",
  },
};

function App() {
  const [selectedTeam, setSelectedTeam] = useState<keyof typeof teams>("nitro");
  const [collectedCards, setCollectedCards] = useState<Set<string>>(new Set());
  const [scannedCard, setScannedCard] = useState<string | null>(null);
  const [showMissingOnly, setShowMissingOnly] = useState<boolean>(false);
  const [showAlternateImages, setShowAlternateImages] = useState<boolean>(true);

  useEffect(() => {
    initGA("G-7Z534Q6P03");
    logPageView();
    let storedCards = localStorage.getItem("collectedCards");
    storedCards = storedCards ? JSON.parse(storedCards) : [];

    setCollectedCards(new Set(storedCards));
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get("cardId");
    const cardExists = players.some((player) => player.id === cardId);
    if (cardId && cardExists) {
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

  const collectedText =
    collectedCards.size === 0
      ? `No ${teams[selectedTeam].title} Trading Cards have been collected`
      : collectedCards.size < 20
      ? `You have collected ${collectedCards.size} / 20 ${teams[selectedTeam].title} Trading Cards`
      : "🏆 Congratulations on collecting all the Nitro players! A representative will be in touch to welcome you into the exclusive Nitro cult. Let's ride!🏎️";

  return (
    <div
      className={`${teams[selectedTeam].background} min-h-screen flex flex-col items-center`}
    >
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
      {selectedTeam === "nitro" ? (
        <div className="text-center">
          <div className="sm:text-base my-2 text-center px-4">
            <p className="text-xl font-semibold">{collectedText}</p>
          </div>
          {collectedCards.size > 0 && (
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <span onClick={() => setShowMissingOnly(!showMissingOnly)}>
                  Show only missing cards
                </span>
                <Checkbox
                  checked={showMissingOnly}
                  onChange={() => setShowMissingOnly(!showMissingOnly)}
                  aria-label="Show only missing cards"
                />
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <span
                  onClick={() => setShowAlternateImages(!showAlternateImages)}
                >
                  Show alternate images
                </span>
                <Checkbox
                  checked={showAlternateImages}
                  onChange={() => setShowAlternateImages(!showAlternateImages)}
                  aria-label="Show alternate images"
                />
              </label>
            </div>
          )}
        </div>
      ) : null}
      <div className="w-screen flex justify-center mt-10">
        <Deck
          team={selectedTeam}
          collectedCards={collectedCards}
          scannedCard={scannedCard}
          setScannedCard={setScannedCard}
          showOnlyMissing={showMissingOnly}
          showAlternateImages={showAlternateImages}
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
