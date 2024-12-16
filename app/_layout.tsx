import { Stack } from 'expo-router';
import { RealmProvider } from '@realm/react';
import { Text } from 'react-native';
import Feeling from '@/schema/feeling';

export default function Layout() {
  return (
    <RealmProvider schema={[Feeling]} fallback={<Text>Loading...</Text>}>
      <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="write" options={{ title: 'Write' }} />
      </Stack>
    </RealmProvider>
  );
}
