import { useState} from 'react';
import '../css/Card.css';
import sample from '../images/scottiev1.gif';
import { Instagram } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Player{
    id: number;
    number: string;
    name: string;
    quote: string;
    likes: string;
    dislikes: string;
    gif: string;
    pic: string;
    instagram: string;
}

interface CardProps{
    player: Player
    active: boolean
    collected: boolean
}

export default function Card({player,active, collected} : CardProps){
    const [isFlipped,setIsFlipped] = useState(false);

    const handleFlip = () => {
      if(!active){
        setIsFlipped(false);
        return;
      }
        setIsFlipped(!isFlipped);
    }

    const acquired = () => false ? 'border-gold' : 'border-white';

    return (
        <div className="perspective-1000" onClick={handleFlip}>
        <div className={`relative w-72 h-96 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className={`absolute w-full h-full flex flex-col items-center justify-center backface-hidden bg-black  rounded-lg p-4 border-8 shadow-md ${acquired()}`}>
            <h2 className="text-white text-2xl">No. {player.number}</h2>
            <img src={sample} alt="Bit art of player" className='w-full h-full image-rendering-pixelated image-rendering-crisp'/>
            <p className="text-white mt-2 text-sm sm:text-base">{player.name}</p>
          </div>
          <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg bg-black p-4 border-8 shadow-md ${acquired()}`}>
            <div className="text-white">
                <div className='text-center mb-4'>
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p>{player.quote}</p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                  <div className="text-left">
                    <p className="mt-2">Likes: {player.likes}</p>
                    <p className="mt-2">Dislikes: {player.dislikes}</p>
                  </div>
                  <div>
                  <p>Socials</p>
              <div>
                <IconButton  component="a" target="_blank" href={`https://www.instagram.com/${player.instagram}`} color="inherit">
                  <Instagram/>
                </IconButton>

              </div>
                  </div>
                </div>
                <div className='flex justify-center itemr-center'>
                <img src={sample} alt="Image of player" className='w-full max-w-xs'/>
                </div>
                </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
}