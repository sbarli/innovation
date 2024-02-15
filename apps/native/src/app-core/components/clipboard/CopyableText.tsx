import { Button, ButtonText, useToast } from '@gluestack-ui/themed';
import * as Clipboard from 'expo-clipboard';

import { CustomToast } from '../toasts/CustomToast';

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
    } catch (_e) {
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
