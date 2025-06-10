import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { getPostsByUserId } from "@/services/post";
import PostListItem from "@/components/PostListItem";
import ProfileHeader from "@/components/ProfileHeader";

export default function ProfileScreen() {
  const { user } = useAuth();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", { user_id: user?.id }],
    queryFn: () => getPostsByUserId(user!.id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-red-500">Error: {error.message}</Text>;
  }

  return (
    <View className="flex-1 justify-center">
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
        ListHeaderComponent={
          <View>
            <ProfileHeader />
            <Text className="text-white text-lg font-bold px-5 border-b border-neutral-800">
              Threads
            </Text>
          </View>
        }
      />

      <Text onPress={() => supabase.auth.signOut()} className="text-white">
        Sign Out
      </Text>
    </View>
  );
}
