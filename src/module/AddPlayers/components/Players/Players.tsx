import { Player } from '@/src/shared/types/globalTypes';
import { normalizedSize } from '@/src/shared/utils/size';
import { View } from 'react-native';
import PlayerItem from './PlayerItem';

interface PlayersProps {
  players: Player[];
}

export default function Players({ players }: PlayersProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: normalizedSize(10) }}>
      {players.map(p => (
        <PlayerItem key={p.id} player={p} />
      ))}
    </View>
  );
}
