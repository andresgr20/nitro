import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/system";

interface TeamSelectorButtonProps {
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
}

const CustomButton = styled(Button)<{ teamColor: string; isSelected: boolean }>(
  ({ teamColor, isSelected }) => ({
    backgroundColor: isSelected ? teamColor : "#E0E0E0",
    color: isSelected ? "#FFFFFF" : "#666666",
    "&:hover": {
      backgroundColor: isSelected ? teamColor : "#CCCCCC",
    },
  })
);

export default function TeamSelectorButton({
  selectedTeam,
  setSelectedTeam,
}: TeamSelectorButtonProps) {
  return (
    <ButtonGroup variant="contained">
      <CustomButton
        onClick={() => setSelectedTeam("nitro")}
        teamColor="#6E9B00"
        isSelected={selectedTeam === "nitro"}
      >
        Nitro
      </CustomButton>

      <CustomButton
        onClick={() => setSelectedTeam("tundra")}
        teamColor="#4FA9BF"
        isSelected={selectedTeam === "tundra"}
      >
        Tundra
      </CustomButton>

      <CustomButton
        onClick={() => setSelectedTeam("polaris")}
        teamColor="#A067C8"
        isSelected={selectedTeam === "polaris"}
      >
        Polaris
      </CustomButton>
    </ButtonGroup>
  );
}
