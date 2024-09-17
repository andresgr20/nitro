import { useState} from 'react';
import '../css/Card.css';
import { Instagram } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import nitro from '../images/nitro-white.png';
import background from '../images/background.jpeg';

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


    return (
        <div className="perspective-1000" onClick={handleFlip}>
        <div className={`relative w-72 h-96 transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front of the card */}
          <div className={`absolute w-full h-full flex flex-col justify-center backface-hidden bg-black rounded-lg border-8 shadow-md ${acquired()}`}>
            <div className='w-full h-[calc(100%-72px)] max-h-[calc(100%-72px)]'>
              <img src={collected ? `images/${player.gif}`: `images/${player.pic}`} alt="Image of the player" className='w-full h-full object-cover max-h-full'/>
            </div>
            <div className='flex justify-between items-center w-full py-2 px-2'>
              <p className="ml-2 text-white text-sm sm:text-base text-left font-bold">{player.name} #{player.number} </p>
              <img src={nitro} alt="logo of the team"  className='w-18 h-14'/>
            </div>
            
          </div>

          {/* Back of the card */}
          <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg back-card p-4 border-8 shadow-md ${acquired()}`}>
            <div className="text-white">
            <div className='flex items-center w-full pb-2'>
  <div className='flex flex-col items-center flex-grow'>
    <h2 className="text-xl font-bold">{player.name}</h2>
    <p className='text-sm'>{player.quote}</p>
  </div>
  <img src={nitro} alt="logo of the team" className='w-18 h-14' />
</div>
                  <div className='gap-4 bg-indigo-100 bg-opacity-50 p-1 rounded-lg'>
                  <div className="text-left">
                  <p className="font-bold">Position</p>
                  <p className='text-xs'>Defence</p>
                    <p className="mt-2 font-bold">Likes</p>
                    <p className='text-xs'>{player.likes}</p>
                    <p className="mt-2 font-bold">Dislikes</p>
                    <p className='text-xs'>{player.dislikes}</p>
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