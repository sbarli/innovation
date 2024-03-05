import { useCallback, useState } from 'react';

import { Button, ButtonIcon, ButtonText, CloseIcon } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { router } from 'expo-router';

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
    router.push(Routes.HOME);
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
        <ButtonIcon color="$red600" as={CloseIcon} />
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
