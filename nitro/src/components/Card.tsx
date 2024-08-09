import React, { useState} from 'react';
import '../css/Card.css';

export default function Card(){
    const [isFlipped,setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="perspective-1000" onClick={handleFlip}>
        <div className={`relative w-72 h-48 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front Side */}
          <div className="absolute w-full h-full flex flex-col items-center justify-center bg-blue-500 backface-hidden rounded-lg p-4">
            <h2 className="text-white text-2xl">Front Title</h2>
            <p className="text-white mt-2">This is the front of the card.</p>
            <button className="mt-4 bg-white text-blue-500 py-2 px-4 rounded">
              Click Me
            </button>
          </div>
  
          {/* Back Side */}
          <div className="absolute w-full h-full flex flex-row items-center justify-around bg-green-500 backface-hidden rotate-y-180 rounded-lg p-4">
            <div className="text-white">
              <h2 className="text-2xl">Back Title</h2>
              <p className="mt-2">This is the back of the card.</p>
            </div>
            <div>
              <button className="bg-white text-green-500 py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}