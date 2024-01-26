import { HeaderWithBackNavigation } from '../../../src/app-core/components/headers/HeaderWithBackNavigation';
import { RoomsScreen } from '../../../src/rooms/screens/RoomsScreen';

// eslint-disable-next-line import/no-default-export
export default function Rooms() {
  return (
    <>
      <HeaderWithBackNavigation title={'Rooms'} />
      <RoomsScreen />
    </>
  );
}
