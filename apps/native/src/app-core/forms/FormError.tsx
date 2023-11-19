import { Text } from '@gluestack-ui/themed';

export interface IFormErrorProps {
  errorMsg?: string;
}
export const FormError = ({ errorMsg }: IFormErrorProps) => {
  return errorMsg ? <Text color="$red500">{errorMsg}</Text> : null;
};
