import { useState} from 'react';
import '../css/Card.css';
import sample from '../images/scottiev1.gif';
import { Instagram } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import nitro from '../images/nitro-white.png';

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

    const acquired = () => collected ? 'border-gold' : 'border-white';

    // V1 of the card
    const v2 = true;

    const v1 =(<div className={`absolute w-full h-full flex flex-col items-center justify-center backface-hidden bg-black  rounded-lg p-4 border-8 shadow-md ${acquired()}`}>
    <h2 className="text-white text-2xl">No. {player.number}</h2>
    <img src={sample} alt="Bit art of player" className='w-full h-full image-rendering-pixelated image-rendering-crisp'/>
    <p className="text-white mt-2 text-sm sm:text-base">{player.name}</p>
  </div>);


    return (
        <div className="perspective-1000" onClick={handleFlip}>
        <div className={`relative w-72 h-96 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front of the card */}
          <div className={`absolute w-full h-full flex flex-col justify-center backface-hidden bg-black rounded-lg border-8 shadow-md ${acquired()}`}>
            <div className='w-full h-[calc(100%-64px)] max-h-[calc(100%-64px)]'>
              <img src={collected ? `images/${player.gif}`: `images/${player.pic}`} alt="Image of the player" className='w-full h-full object-cover max-h-full'/>
            </div>
            <div className='flex justify-between items-center w-full mt-2 px-2'>
              <p className="ml-2 text-white mt-2 text-sm sm:text-base text-left font-bold text-center ">{player.name} #{player.number} </p>
              <img src={nitro} alt="logo of the team"  className='w-18 h-14'/>
            </div>
            
          </div>

          {/* Back of the card */}
          <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg bg-black p-4 border-8 shadow-md ${acquired()}`}>
            <div className="text-white">
                <div className='text-center mb-4'>
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p className='italics'>{player.quote}</p>
                </div>
                  <div className='gap-4'>
                  <div className="text-left">
                  <p className="mt-2 font-bold">Position</p>
                  <p className=''>Defence</p>
                    <p className="mt-2 font-bold">Likes</p>
                    <p className=''>{player.likes}</p>
                    <p className="mt-2 font-bold">Dislikes</p>
                    <p>{player.dislikes}</p>
                  </div>
                  <div>
                  <p className='font-bold mt-2'>Socials</p>
              <div>
                <IconButton  component="a" target="_blank" href={`https://www.instagram.com/${player.instagram}`} color="inherit">
                  <Instagram/>
                </IconButton>

                  </div>
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