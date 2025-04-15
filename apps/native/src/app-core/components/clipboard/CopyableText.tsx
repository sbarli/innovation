import * as Clipboard from 'expo-clipboard';

import { CustomToast } from '../toasts/CustomToast';

import { Button, ButtonText } from '../gluestack/button';
import { useToast } from '../gluestack/toast';

export const CopyableText = ({ text }: { text: string }) => {
  const toast = useToast();

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(text);
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <CustomToast
            id={id}
            title="Copied Text"
            description={`${text} was successfully copied to clipboard.`}
          />
        ),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e: unknown) {
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <CustomToast
            action="error"
            id={id}
            title="Copied Text Error"
            description="Unable to copy text to clipboard"
          />
        ),
      });
    }
  };

  return (
    <Button
      size="md"
      variant="link"
      action="secondary"
      isDisabled={false}
      isFocusVisible={false}
      onPress={copyToClipboard}
    >
      <ButtonText>{text}</ButtonText>
    </Button>
  );
};
