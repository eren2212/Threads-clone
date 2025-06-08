import { ActivityIndicator, FlatList, Text } from "react-native";
import PostListItem from "@/components/PostListItem";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*,user:profiles(*)")
    .is("parent_id", null)
    .throwOnError();
  return data;
};

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
  });

  if (isLoading) {
    return <ActivityIndicator color="white" />;
  }

  if (error) {
    return <Text className="text-red-500">Error: {error.message}</Text>;
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
