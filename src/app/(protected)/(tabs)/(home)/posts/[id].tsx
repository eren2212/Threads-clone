import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import PostListItem from "@/components/PostListItem";
const getPostById = async (id: string) => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*)")
    .eq("id", id)
    .single()
    .throwOnError();

  return data;
};

export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-red-500">{error.message}</Text>;
  }

  console.log(JSON.stringify(data, null, 2));

  return <PostListItem post={data} />;
}
