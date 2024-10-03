import { useEffect, useState } from "react";
import Deck from "./components/Deck";
import TeamSelectorButton from "./components/TeamSelectorButton";
import { initGA, logPageView } from "./analytics";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import players from "data/players.json";
import "./index.css";

const teamSelectorEnabled = true;

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

  const getCollectedText = () => {
    const count = collectedCards.size;
    if (count === 0)
      return `No ${teams[selectedTeam].title} Trading Cards have been collected`;
    if (count < 20)
      return `You have collected ${count} / 20 ${teams[selectedTeam].title} Trading Cards`;
    return "🏆 Congratulations on collecting all the Nitro players! A representative will be in touch to welcome you into the exclusive Nitro cult. Let's ride!🏎️";
  };
  return (
    <div
      className={`${teams[selectedTeam].background} min-h-screen flex flex-col items-center`}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl  mt-4 font-bold uppercase py-4 text-center">
        Toronto Northstars
      </div>
      {teamSelectorEnabled && (
        <div className="pb-4">
          <TeamSelectorButton
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
      )}
      <div className="border bg-gray-200 backdrop-blur-md shadow-lg rounded-xl max-w-6xl w-full max-w text-center">
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-center pt-2">
          {teams[selectedTeam].title}
        </p>
        <div className="sm:text-base my-2 text-center px-4">
          <p className="text-xl">{teams[selectedTeam].description} </p>
        </div>

        <div className="flex justify-center mt-10">
          <Deck
            team={selectedTeam}
            collectedCards={collectedCards}
            scannedCard={scannedCard}
            setScannedCard={setScannedCard}
            showOnlyMissing={showMissingOnly}
            showAlternateImages={showAlternateImages}
          />
        </div>
        {selectedTeam === "nitro" && (
          <div className="items-center">
            <div className="sm:text-base my-2 text-center px-4">
              <p className="text-xl font-semibold">{getCollectedText()}</p>
            </div>
            {collectedCards.size > 0 && (
              <FormGroup row className="justify-center pb-2">
                {collectedCards.size < 20 && (
                  <FormControlLabel
                    labelPlacement="end"
                    label="Show only missing cards"
                    control={
                      <Switch
                        checked={showMissingOnly}
                        onChange={() => setShowMissingOnly(!showMissingOnly)}
                      />
                    }
                  />
                )}

                <FormControlLabel
                  labelPlacement="end"
                  label="Show alternate images"
                  control={
                    <Switch
                      checked={showAlternateImages}
                      onChange={() =>
                        setShowAlternateImages(!showAlternateImages)
                      }
                    />
                  }
                />
              </FormGroup>
            )}
          </div>
        )}
      </div>

      <footer className="md:fixed bottom-0 w-full text-center pt-2">
        <a
          href="https://www.linkedin.com/in/agarciar/"
          className="no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          © Andres Garcia
        </a>
      </footer>
    </div>
  );
}

export default App;
