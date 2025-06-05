import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createPost = async (content: string, user_id: string) => {
  const { data } = await supabase
    .from("posts")
    .insert({
      content,
      user_id,
    })
    .select("*")
    .throwOnError();

  return data;
};

export default function NewScreen() {
  const [text, setText] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => createPost(text, user!.id),
    onSuccess: (data) => {
      Toast.show({
        text1: "Post oluşturuldu!",
        type: "success",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      router.back();
      setText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error) => {
      Toast.show({
        text1: "Bir hata oluştu!",
        type: "error",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    },
  });

  return (
    <SafeAreaView className="p-4 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
        <Text className="text-white text-2xl font-bold">username</Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Ne düşüyorsun?"
          placeholderTextColor="gray"
          className="text-white text-lg"
          multiline
          numberOfLines={4}
        />

        <View className="mt-auto">
          <Pressable
            onPress={() => mutate()}
            disabled={isPending}
            className="bg-white rounded-full px-4 py-2 self-end"
          >
            <Text className="text-black font-bold">Paylaş</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
