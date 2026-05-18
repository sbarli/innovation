import { ActivityIndicator, View } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSupabase } from '../../src/supabase/SupabaseProvider';

export default function AppLayout() {
  const { session, loading } = useSupabase();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return <Stack />;
}
