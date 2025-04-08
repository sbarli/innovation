import { PropsWithChildren } from 'react';

import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CloseIcon, Icon } from '@/components/ui/icon';
import {
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal,
} from '@/components/ui/modal';

export interface IInteractiveModal extends PropsWithChildren {
  cancelText?: string;
  confirmText?: string;
  disabled?: boolean;
  headerText: string;
  onClose: () => void;
  onConfirm?: () => void;
  showModal: boolean;
}

export const InteractiveModal = ({
  cancelText,
  children,
  confirmText,
  disabled,
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
          <ModalCloseButton disabled={disabled}>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {cancelText ? (
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              onPress={onClose}
              disabled={disabled}
              className="mr-3"
            >
              <ButtonText>{cancelText}</ButtonText>
            </Button>
          ) : null}
          {confirmText && onConfirm ? (
            <Button
              size="sm"
              action="positive"
              onPress={onConfirm}
              disabled={disabled}
              className="border-0"
            >
              <ButtonText>{confirmText}</ButtonText>
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
