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
}

export default function Card({player,active} : CardProps){
    const [isFlipped,setIsFlipped] = useState(false);

    const handleFlip = () => {
      if(!active){
        setIsFlipped(false);
        return;
      }
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="perspective-1000" onClick={handleFlip}>
        <div className={`relative w-72 h-96 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black backface-hidden rounded-lg p-4 border-4 border-silver shadow-md">
            <h2 className="text-white text-2xl">No. {player.number}</h2>
            <img src={sample} alt="Bit art of player" className='w-full h-full image-rendering-pixelated image-rendering-crisp'/>
            <p className="text-white mt-2 text-sm sm:text-base">{player.name}</p>
          </div>
          <div className="absolute w-full h-full grid grid-cols-2 bg-black backface-hidden rotate-y-180 rounded-lg p-4 border-4 border-silver shadow-md">
            <div className="text-white gap-4'">
                <div className='col-span-2 text-center'>
                <h2 className="text-xl font-bold">{player.name}</h2>
                </div>
                <div className='flex justify-center items-center'>
                <p>{player.quote}</p>
                </div>
                <div className='flex justify-center itemrs-center'>
                <img src={sample} alt="Image of player" className='w-full max-w-xs'/>
                </div>
                <div className="col-span-2 text-left">
                <p className="mt-2">Likes: {player.likes}</p>
              <p className="mt-2">Dislikes: {player.dislikes}</p>
              <p>Socials</p>
              <div>
                <IconButton  component="a" target="_blank" href={player.instagram} color="inherit">
                  <Instagram/>
                </IconButton>

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