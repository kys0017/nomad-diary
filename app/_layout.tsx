import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="write" options={{ title: 'Write' }} />
    </Stack>
  );
}
