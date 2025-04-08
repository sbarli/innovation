import { Text } from '@/components/ui/text';

export interface IFormErrorProps {
  errorMsg?: string;
}
export const FormError = ({ errorMsg }: IFormErrorProps) => {
  return errorMsg ? <Text className="text-red-500">{errorMsg}</Text> : null;
};
