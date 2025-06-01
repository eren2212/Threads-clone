import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { dummyData, dummyPosts } from "@/dummyData";
import PostListItem from "@/components/PostListItem";

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
