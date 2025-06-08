import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "@/lib/supabase";
import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
import { getPostById } from "@/services/post";

export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-red-500">{error.message}</Text>;
  }

  console.log(JSON.stringify(data, null, 2));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}
    >
      <View className="flex-1 bg-neutral-900">
        <FlatList
          data={[]}
          renderItem={({ item }) => <PostListItem post={item} />}
          ListHeaderComponent={<PostListItem post={data} />}
        />
        <PostReplyInput postId={id} />
      </View>
    </KeyboardAvoidingView>
  );
}
