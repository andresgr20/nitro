import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Deck from './components/Deck';

function App() {
  return (
    <div className='bg-nitro min-h-screen flex flex-col'>
      <div className='flex justify-center items-center w-screen text-6xl md:text-5xl sm:text-4xl  mt-4'>
      Northstars Nitro
      </div>
    <div className='flex justify-center items-center w-screen text-lg sm:text-base my-2 text-center px-4'>
    Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.
    </div>
    <div className='flex justify-center items-center w-screen text-3xl sm:text-2xl my-4'>    
      Roster
    </div>
    <div className='flex justify-center items-center w-screen my-8'>
      <Deck/>
    </div>
    <div className='flex justify-center items-center w-screen my-8'>
      © Andres Garcia Rodriguez
    </div>
    </div>
  );
}

export default App;
