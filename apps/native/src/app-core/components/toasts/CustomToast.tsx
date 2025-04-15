import { Toast, ToastDescription, ToastTitle } from '../gluestack/toast';
import { VStack } from '../gluestack/vstack';

export interface ICustomToastProps {
  action?: 'error' | 'warning' | 'success' | 'info' | 'muted';
  description: string;
  id: string;
  title: string;
}

export const CustomToast = ({ action, description, id, title }: ICustomToastProps) => {
  const toastId = 'toast-' + id;
  return (
    <Toast nativeID={toastId} action={action ?? 'info'} variant="solid">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </VStack>
    </Toast>
  );
};
