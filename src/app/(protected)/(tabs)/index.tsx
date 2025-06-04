import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*,user:profiles(*)");
    if (error) {
      console.log(error);
    }

    setPosts(data as Post[]);
  };
  console.log(JSON.stringify(posts, null, 2));

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <Link href="/new" className="text-white">
          New Post
        </Link>
      )}
    />
  );
}
