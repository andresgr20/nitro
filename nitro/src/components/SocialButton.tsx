import { GitHub, Instagram } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import SpotifyIcon from "./SpotifyIcon";
import TiktokIcon from "./TiktokIcon";

export interface SocialButtonProps {
  social: string;
  description: string;
  secretUnlocked?: boolean;
}

export default function SocialButton({
  social,
  description,
  secretUnlocked,
}: SocialButtonProps) {
  const icon = () => {
    if (social === "instagram") {
      return <Instagram fontSize="large" />;
    } else if (social === "spotify") {
      return <SpotifyIcon className="w-14 h-14 fill-current text-gold" />;
    } else if (social === "github") {
      return <GitHub fontSize="large" />;
    } else if (social === "tiktok") {
      return <TiktokIcon className="w-14 h-14 fill-current text-gold" />;
    }
    return;
  };

  return (
    <IconButton
      component="a"
      target="_blank"
      href={description}
      style={secretUnlocked ? { color: "#EAA11B" } : { color: "inherit" }}
    >
      {icon()}
    </IconButton>
  );
}
