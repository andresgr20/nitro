import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import TeamSelectorButton from './components/TeamSelectorButton';
import polaris from './images/polaris-logo.png';
import nitro from './images/nitro-logo.png';
import tundra from './images/tundra-logo.png';
import { initGA, logPageView } from './analytics';

const description = [
  "Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.",
  "Tundra",
  "Polaris"
];

const title = [
  'Nitro',
  "Tundra",
  "Polaris"
];

function App() {
  const [selectedTeam,setSelectedTeam] = useState(0);
  const [collectedCards,setCollectedCards] = useState<Set<string>>(new Set());
  const [scannedCard,setScannedCard] = useState<string | null>(null);

  useEffect(() => {
    initGA('G-7Z534Q6P03');
    logPageView();
    let storedCards = localStorage.getItem('collectedCards');
    storedCards = storedCards ? JSON.parse(storedCards) : [];

    setCollectedCards(new Set(storedCards));
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('cardId');
    if(cardId){
      const updatedCards = new Set(storedCards);
      if(!updatedCards.has(cardId)){
        updatedCards.add(cardId);
        localStorage.setItem('collectedCards', JSON.stringify(Array.from(updatedCards)));
        setCollectedCards(updatedCards);
      }
      setScannedCard(cardId);
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  const logo = selectedTeam == 0 ? nitro : selectedTeam == 1 ? tundra : polaris;
  return (
  <div className='bg-nitro min-h-screen flex flex-col items-center'>
    <div className='text-6xl md:text-5xl sm:text-4xl mt-4 font-bold uppercase py-4'>
    Northstars {title[selectedTeam]}
    </div>
    <div className='sm:text-base my-2 text-center px-4'>
    <p className='text-xl'>{description[selectedTeam]} </p>
    </div>
    {/* <TeamSelectorButton 
    selectedTeam={selectedTeam} 
    setSelectedTeam={setSelectedTeam} 
    /> */}
  <div className='w-screen flex justify-center mt-10'>
    <Deck 
    team={selectedTeam}
    collectedCards={collectedCards}
    scannedCard={scannedCard}
    setScannedCard={setScannedCard}
    />
  </div>
  <div className='md:fixed bottom-0 w-full text-center py-2'>
    © Andres Garcia Rodriguez
  </div>
</div>
  );
}

export default App;
