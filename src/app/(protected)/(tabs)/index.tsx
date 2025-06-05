import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*,user:profiles(*)")
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
