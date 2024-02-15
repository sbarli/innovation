import { Toast, ToastDescription, ToastTitle, VStack } from '@gluestack-ui/themed';

export interface ICustomToastProps {
  action?: 'error' | 'warning' | 'success' | 'info' | 'attention' | undefined;
  description: string;
  id: string;
  title: string;
}

export const CustomToast = ({ action, description, id, title }: ICustomToastProps) => {
  const toastId = 'toast-' + id;
  return (
    <Toast nativeID={toastId} action={action ?? 'attention'} variant="solid">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </VStack>
    </Toast>
  );
};
