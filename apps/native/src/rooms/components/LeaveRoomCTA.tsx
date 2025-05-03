import { useCallback, useState } from 'react';

import { router } from 'expo-router';

import { Button, ButtonIcon, ButtonText } from '../../app-core/components/gluestack/button';
import { CloseIcon } from '../../app-core/components/gluestack/icon';
import { Text } from '../../app-core/components/gluestack/text';
import { InteractiveModal } from '../../app-core/components/modal/InteractiveModal';
import { Routes } from '../../app-core/constants/navigation';
import { FormError } from '../../app-core/forms/FormError';
import { useAuthContext } from '../../authentication/state/AuthProvider';
import { useLeaveRoom } from '../hooks/useLeaveRoom';

export const LeaveRoomCTA = ({ roomId }: { roomId: string }) => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSuccessfulLeaveRoom = () => {
    setShowModal(false);
    router.push(Routes.HOME.path);
  };

  const { handleLeaveRoom, errorMsg, loading } = useLeaveRoom({
    roomId,
    successCallback: handleSuccessfulLeaveRoom,
    username: user?.username ?? '',
  });

  return (
    <>
      <Button onPress={() => setShowModal(true)} variant="outline" action="negative" size="sm">
        <ButtonText>Leave Room </ButtonText>
        <ButtonIcon as={CloseIcon} className="text-red-600" />
      </Button>
      <InteractiveModal
        confirmText="Confirm Leave Room"
        disabled={loading}
        headerText="Are you sure you want to leave the room?"
        onClose={handleClose}
        onConfirm={handleLeaveRoom}
        showModal={showModal}
      >
        <Text>Leaving will end the game for everyone.</Text>
        {errorMsg ? <FormError errorMsg={errorMsg} /> : null}
      </InteractiveModal>
    </>
  );
};
