import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

function App() {
  return (
    <div className='bg-nitro h-screen'>
      <div className='flex justify-center items-center w-screen text-6xl'>
      Northstars Nitro
      </div>

    <div className='flex justify-center items-center w-screen'>
    Toronto's brattiest, greenest, and speediest flag football traveling team is heading to Austin GayBowl 2024.
    </div>
    <div className='flex justify-center items-center w-screen text-3xl'>    
      Roster
    </div>
    <div className='flex justify-center items-center'>
      <Card/>
    </div>
    <div>
      © Andres Garcia Rodriguez
    </div>
    </div>
  );
}

export default App;
