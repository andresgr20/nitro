import { Button, ButtonGroup } from "@mui/material";

interface TeamSelectorButtonProps {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
}

export default function TeamSelectorButton({
  selectedTeam,
  setSelectedTeam,
}: TeamSelectorButtonProps) {
  return (
    <ButtonGroup variant="contained">
      <Button
        onClick={() => setSelectedTeam("nitro")}
        color={selectedTeam === "nitro" ? "primary" : "secondary"}
      >
        Nitro
      </Button>
      <Button
        onClick={() => setSelectedTeam("tundra")}
        color={selectedTeam === "tundra" ? "primary" : "secondary"}
      >
        Tundra
      </Button>
      <Button
        onClick={() => setSelectedTeam("polaris")}
        color={selectedTeam === "polaris" ? "primary" : "secondary"}
      >
        Polaris
      </Button>
    </ButtonGroup>
  );
}
