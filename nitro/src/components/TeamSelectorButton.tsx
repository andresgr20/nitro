import {Button, ButtonGroup} from '@mui/material'
interface TeamSelectorButtonProps{
    selectedTeam: number;
    setSelectedTeam: (arg: number) => void;
}
export default function TeamSelectorButton({selectedTeam,setSelectedTeam}: TeamSelectorButtonProps){
    return (
        <ButtonGroup variant='contained'>
            <Button onClick={() => setSelectedTeam(0)} color={selectedTeam == 0 ? 'primary': 'secondary'}>Nitro</Button>
            <Button onClick={() => setSelectedTeam(1)} color={selectedTeam == 1 ? 'primary': 'secondary'}>Tundra</Button>
            <Button onClick={() => setSelectedTeam(2)} color={selectedTeam == 2 ? 'primary': 'secondary'}>Polaris</Button>
        </ButtonGroup>
    )

}