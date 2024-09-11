import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Deck from './components/Deck';
import TeamSelectorButton from './components/TeamSelectorButton';
import polaris from './images/polaris-logo.png';
import nitro from './images/nitro-logo.png';
import tundra from './images/tundra-logo.png';

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
// TODO: make colour cohesive
function App() {
  const [selectedTeam,setSelectedTeam] = useState(0);
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
  <div className='text-3xl sm:text-2xl my-4'>
    Roster
  </div>
  <div className='w-screen flex justify-center'>
    <Deck team={selectedTeam}/>
  </div>
  <div className='fixed bottom-0 w-full text-center py-2'>
    © Andres Garcia Rodriguez
  </div>
</div>
  );
}

export default App;
