import { supabase } from "@/lib/supabase";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const handleSignOut = () => {
    supabase.auth.signOut();
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text onPress={() => handleSignOut()} className="text-white">
        Sign Out
      </Text>
    </View>
  );
}
