import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import TeamSelectorButton from './components/TeamSelectorButton';
import polaris from './images/polaris-logo.png';
import nitro from './images/nitro-logo.png';
import tundra from './images/tundra-logo.png';
import { FormControl, FormControlLabel, FormGroup, Switch } from '@mui/material';

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

// TODO: Add QR jump 
function App() {
  const [selectedTeam,setSelectedTeam] = useState(0);
  const [checked, setChecked] = useState(false);
  const [collectedCards,setCollectedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
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
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);
  
  const handleCheck = () => setChecked(!checked);

  const logo = selectedTeam == 0 ? nitro : selectedTeam == 1 ? tundra : polaris;
  return (
  <div className='bg-nitro min-h-screen flex flex-col items-center'>
    <div className='text-6xl md:text-5xl sm:text-4xl mt-4'>
    {/* <img src={logo} /> */}
    Northstars {title[selectedTeam]}
    </div>
    <div className='text-lg sm:text-base my-2 text-center px-4'>
    {description[selectedTeam]}
    </div>
    <TeamSelectorButton 
    selectedTeam={selectedTeam} 
    setSelectedTeam={setSelectedTeam} 
    />
    <FormGroup>
      <FormControlLabel control={<Switch checked={checked} onChange={handleCheck}/>} label="Collected cards only?"/>
    </FormGroup>
  <div className='text-3xl sm:text-2xl my-4'>
    Roster
  </div>
  <div className='w-screen flex justify-center'>
    <Deck 
    team={selectedTeam}
    showCollectedOnly={checked}
    collectedCards={collectedCards}
    />
  </div>
  <div className='md:fixed bottom-0 w-full text-center py-2'>
    © Andres Garcia Rodriguez
  </div>
</div>
  );
}

export default App;
