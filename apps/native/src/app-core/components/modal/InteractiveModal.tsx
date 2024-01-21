import { PropsWithChildren } from 'react';

import {
  CloseIcon,
  Heading,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
} from '@gluestack-ui/themed';
import { ModalFooter } from '@gluestack-ui/themed';
import { ModalHeader } from '@gluestack-ui/themed';
import { Button, ButtonText, Modal } from '@gluestack-ui/themed';

export interface IInteractiveModal extends PropsWithChildren {
  cancelText?: string;
  confirmText?: string;
  headerText: string;
  onClose: () => void;
  onConfirm?: () => void;
  showModal: boolean;
}

export const InteractiveModal = ({
  cancelText,
  children,
  confirmText,
  headerText,
  onClose,
  onConfirm,
  showModal,
}: IInteractiveModal) => {
  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{headerText}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {cancelText ? (
            <Button variant="outline" size="sm" action="secondary" mr="$3" onPress={onClose}>
              <ButtonText>{cancelText}</ButtonText>
            </Button>
          ) : null}
          {confirmText && onConfirm ? (
            <Button size="sm" action="positive" borderWidth="$0" onPress={onConfirm}>
              <ButtonText>{confirmText}</ButtonText>
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
