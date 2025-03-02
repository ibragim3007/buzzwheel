import { Player } from '@/src/shared/types/globalTypes';
import Grid from '@/src/shared/ui/grid/Grid';
import PlayerItem from './PlayerItem';

interface PlayersProps {
  players: Player[];
}

export default function Players({ players }: PlayersProps) {
  return (
    <Grid space="md">
      {players.map(p => (
        <PlayerItem key={p.id} player={p} />
      ))}
    </Grid>
  );
}
