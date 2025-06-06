import { Pressable, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import { Tables } from "@/types/database.types";
import dayjs from "dayjs";
import "dayjs/locale/tr";

dayjs.locale("tr");
dayjs.extend(relativeTime);

type PostWithUser = Tables<"posts"> & {
  user: Tables<"profiles">;
};

export default function PostListItem({ post }: { post: PostWithUser }) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable>
        <View className="flex-row p-4 border-b border-gray-800/70">
          {/* Avatar */}
          <Image
            source={{ uri: post.user.avatar_url ?? undefined }}
            className="w-10 h-10 rounded-full mr-3"
          />

          {/* Content */}
          <View className="flex-1">
            {/* User Info */}
            <View className="flex-row items-center">
              <Text className="text-white font-bold mr-2">
                {post.user.username}
              </Text>
              <Text className="text-gray-500">
                · {dayjs(post.created_at).fromNow()}
              </Text>
            </View>

            {/* Post Content */}
            <Text className="text-white my-2">{post.content}</Text>

            {/* Interaction Buttons */}
            <View className="flex-row gap-4 mt-3 pr-8">
              <Pressable className="flex-row items-center">
                <Ionicons name="heart-outline" size={20} color="#d1d5db" />
                <Text className="text-gray-300 ml-2">0</Text>
              </Pressable>

              <Pressable className="flex-row items-center">
                <Ionicons name="chatbubble-outline" size={20} color="#d1d5db" />
                <Text className="text-gray-300 ml-2">{0}</Text>
              </Pressable>

              <Pressable className="flex-row items-center">
                <Ionicons name="repeat-outline" size={20} color="#d1d5db" />
                <Text className="text-gray-300 ml-2">0</Text>
              </Pressable>

              <Pressable>
                <Ionicons
                  name="paper-plane-outline"
                  size={20}
                  color="#d1d5db"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
