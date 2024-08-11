import { useState} from 'react';
import '../css/Card.css';
import sample from '../sample-gif.gif';

export default function Card(){
    const [isFlipped,setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="perspective-1000" onClick={handleFlip}>
        <div className={`relative w-72 h-96 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full flex flex-col items-center justify-center bg-blue-500 backface-hidden rounded-lg p-4">
            <h2 className="text-white text-2xl">No. 20</h2>
            <img src={sample} alt="Bit art of player"/>
            <p className="text-white mt-2">Scott Fowlie</p>
          </div>
          <div className="absolute w-full h-full flex flex-row items-center justify-around bg-green-500 backface-hidden rotate-y-180 rounded-lg p-4">
            <div className="text-white">
              <h2 className="text-2xl">Scott Fowlie</h2>
              <img src={sample} alt="Bit art of player"/>
              <p>Tiny but mighty</p>
              <p className="mt-2">Likes:</p>
              <p className="mt-2">Dislikes:</p>
              <p>Socials</p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
}