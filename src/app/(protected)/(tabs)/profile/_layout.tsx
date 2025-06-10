import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profil" }} />
      <Stack.Screen
        name="edit"
        options={{ title: "Profili Düzenle", presentation: "modal" }}
      />
    </Stack>
  );
}
