import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { dummyData, dummyPosts } from "@/dummyData";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <Link href="/new" className="text-white">
          New Post
        </Link>
      )}
    />
  );
}
