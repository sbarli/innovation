import { Toast, ToastDescription, ToastTitle, VStack } from '@gluestack-ui/themed';

export interface ICustomToastProps {
  description: string;
  id: string;
  title: string;
}

export const CustomToast = ({ description, id, title }: ICustomToastProps) => {
  const toastId = 'toast-' + id;
  return (
    <Toast nativeID={toastId} action="attention" variant="solid">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </VStack>
    </Toast>
  );
};
