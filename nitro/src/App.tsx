import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

function App() {
  return (
    <div>
      <div>
      Northstars Nitro
      </div>

    <div>
    Toronto's brattiest and speediest flag football traveling team is heading to Austin GayBowl 2024.
    </div>
    <div className='flex justify-center items-center'>
      Roster
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card/>
    </div>
    </div>
    <div>
      © Andres Garcia Rodriguez
    </div>
    </div>
  );
}

export default App;
