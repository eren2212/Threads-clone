import PostListItem from "@/components/PostListItem";
import PostReplyInput from "@/components/PostReplyInput";
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

  const { data: parent } = useQuery({
    queryKey: ["posts", post?.parent_id],
    queryFn: () => getPostById(post?.parent_id || ""),
    enabled: !!post?.parent_id,
  });

  const { data: replies } = useQuery({
    queryKey: ["posts", id, "replies"],
    queryFn: () => getPostReplies(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-white">{error.message}</Text>;
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={replies || []}
        renderItem={({ item }) => <PostListItem post={item} />}
        ListHeaderComponent={
          <View>
            {parent && <PostListItem post={parent} isLastInGroup={false} />}
            <PostDetails post={post} />
            <Text className="text-white text-lg font-bold p-4 border-b border-neutral-800">
              Yanıtlar
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 10 }}
        keyboardShouldPersistTaps="handled"
      />
      <PostReplyInput postId={id} />
    </KeyboardAvoidingView>
  );
}
