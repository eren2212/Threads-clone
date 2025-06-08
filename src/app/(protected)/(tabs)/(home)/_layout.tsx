import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Anasayfa" }} />
      <Stack.Screen
        name="posts/[id]"
        options={{
          title: "Gönderi",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
