import { Stack } from 'expo-router';

export default function StackRoute() {
  return (
    <Stack initialRouteName="screens/game" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/game" />
      <Stack.Screen name="screens/packages" />
      <Stack.Screen name="screens/gift" />
      <Stack.Screen name="screens/gameModeScreen" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
