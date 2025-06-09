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
import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
import { getPostById, getPostReplies } from "@/services/post";
import PostDetails from "@/components/PostDetails";

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    staleTime: 1000 * 60 * 5,
  });

  const { data: replies } = useQuery({
    queryKey: ["posts", id, "replies"],
    queryFn: () => getPostReplies(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-red-500">{error.message}</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}
    >
      <View className="flex-1 bg-neutral-900">
        <FlatList
          data={replies || []}
          renderItem={({ item }) => <PostListItem post={item} />}
          ListHeaderComponent={
            <View>
              <PostDetails post={post} />
              <View className="px-4 py-2 bg-neutral-800/50 flex-row justify-between items-center">
                <Text className="text-white font-semibold text-base mb-1">
                  Yanıtlar
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View className="p-6 items-center">
              <Text className="text-neutral-500 text-center">
                Henüz yanıt yok. İlk yanıtı sen yaz..
              </Text>
            </View>
          }
        />
        <PostReplyInput postId={id} />
      </View>
    </KeyboardAvoidingView>
  );
}
