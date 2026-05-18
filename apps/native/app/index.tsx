import { Redirect } from 'expo-router';
import { useSupabase } from '../src/supabase/SupabaseProvider';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { session, loading } = useSupabase();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return session ? <Redirect href="/(app)" /> : <Redirect href="/auth" />;
}
