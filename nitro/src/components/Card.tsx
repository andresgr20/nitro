import { useState } from "react";
import "../css/Card.css";
import nitro from "../images/nitro-white.png";
import tundra from "../images/tundra-white.png";
import polaris from "../images/polaris-white.png";
import SocialButton from "./SocialButton";

interface Secret {
  secret: string;
  description: string;
}

export interface Player {
  id: string;
  number: string;
  name: string;
  quote: string;
  likes: string;
  dislikes: string;
  gif?: string;
  pic: string;
  instagram?: string;
  looking: string;
  position?: string;
  team: string;
  secret?: Secret[];
}

interface CardProps {
  player: Player;
  active: boolean;
  collected: boolean;
  showAlternateImage: boolean;
}

export default function Card({
  player,
  active,
  collected,
  showAlternateImage,
}: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (active) {
      setIsFlipped(!isFlipped);
    }
  };

  const acquired = () => (collected ? "border-gold" : "border-white");

  const team = () =>
    player.team === "nitro"
      ? nitro
      : player.team === "tundra"
      ? tundra
      : polaris;

  const backData = [
    { label: "Position", value: player.position },
    { label: "Looking for", value: player.looking },
    { label: "Likes", value: player.likes },
    { label: "Dislikes", value: player.dislikes },
  ];

  if (collected && player.secret && player.secret[0].secret == "text") {
    backData.push({ label: "Secret", value: player.secret[0].description });
  }

  return (
    <div className="perspective-1000" onClick={handleFlip}>
      <div
        className={`relative w-72 h-96 transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className={`absolute w-full h-full flex flex-col justify-center backface-hidden bg-black rounded-lg border-8 shadow-md ${acquired()}`}
        >
          <div className="w-full h-[calc(100%-72px)] max-h-[calc(100%-72px)]">
            <img
              src={
                collected && showAlternateImage
                  ? `images/${player.gif}`
                  : `images/${player.pic}`
              }
              alt="Player"
              className="w-full h-full object-cover max-h-full"
            />
          </div>
          <div className="flex justify-between items-center w-full py-2 px-2">
            <p className="ml-2 text-white text-sm sm:text-base text-left font-bold">
              {player.name} #{player.number}{" "}
            </p>
            <img src={team()} alt="logo of the team" className="w-18 h-14" />
          </div>
        </div>

        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg back-card p-4 border-8 shadow-md ${acquired()}`}
        >
          <div className="text-white h-full flex flex-col justify-between">
            <div className="flex items-center w-full">
              <div className="w-full flex flex-col text-left">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p className="text-sm">{player.quote}</p>
              </div>
              <img src={team()} alt="logo of the team" className="w-18 h-14" />
            </div>
            <div className="bg-indigo-100 bg-opacity-30 p-1 rounded-lg flex flex-col justify-between">
              <div className="text-center">
                {backData.map((item, index) => (
                  <div key={index} className={`${index > 0 ? "mt-2" : ""} `}>
                    <p
                      className={`font-bold ${
                        item.label === "Secret" ? "text-gold italic" : ""
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center pb-5">
              {player.instagram && (
                <SocialButton
                  social="instagram"
                  description={player.instagram}
                />
              )}
              {collected &&
                player.secret &&
                player.secret.map((secret, index) => {
                  const isSocialSecret = secret.secret !== "text";

                  return isSocialSecret ? (
                    <SocialButton
                      key={index}
                      social={secret.secret}
                      description={secret.description}
                      secretUnlocked={collected}
                    />
                  ) : null;
                })}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
