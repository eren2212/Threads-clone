import { useAuth } from "@/providers/AuthProvider";
import { getProfileById } from "@/services/profiles";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import SupabaseImage from "./SupbaseImage";

export default function ProfileHeader() {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  console.log(JSON.stringify(profile, null, 2));
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text className="text-red-500">Error: {error.message}</Text>;
  }

  return (
    <View className="p-4 gap-4">
      <View className="flex-row items-center justify-between gap-2">
        <View className="gap-1">
          <Text className="text-white text-2xl font-bold">
            {profile?.full_name}
          </Text>
          <Text className="text-neutral-200 text-lg">{profile?.username}</Text>
        </View>

        {/* <SupabaseImage
          bucket="avatars"
          path={profile?.avatar_url || ""}
          className="w-20 h-20 rounded-full"
          transform={{ width: 80, height: 80 }}
        /> */}
        <Image
          source={{ uri: profile?.avatar_url || undefined }}
          className="w-20 h-20 rounded-full"
        />
      </View>
      <Text className="text-neutral-200 text-lg leading-snug">
        {profile?.bio}
      </Text>

      <View className="flex-row  gap-4">
        <Pressable className="flex-1  justify-center border-2 border-neutral-800 p-3 rounded-2xl">
          <Text className="text-center text-neutral-200  ">
            Profili Düzenle
          </Text>
        </Pressable>

        <Pressable className="flex-1  justify-center  border-2 border-neutral-800 p-3 rounded-2xl">
          <Text className="text-center text-neutral-200  ">Profili Paylaş</Text>
        </Pressable>
      </View>
    </View>
  );
}
