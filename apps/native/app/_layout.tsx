import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { queryClient } from '../src/api/queryClient';
import { SupabaseProvider } from '../src/supabase/SupabaseProvider';
import { SocketProvider } from '../src/websockets/SocketProvider';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider>
          <SocketProvider>
            <Stack />
          </SocketProvider>
        </SupabaseProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
