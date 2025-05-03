import { HeaderNoNav } from '../../src/app-core/components/headers/HeaderNoNav';
import { Routes } from '../../src/app-core/constants/navigation';
import { TrainingScreen } from '../../src/training/TrainingScreen';

// eslint-disable-next-line import/no-default-export
export default function Training() {
  return (
    <>
      <HeaderNoNav title={Routes.TRAINING.name} />
      <TrainingScreen />
    </>
  );
}
