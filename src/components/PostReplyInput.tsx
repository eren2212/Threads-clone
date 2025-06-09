import { Keyboard, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/services/post";
import { useAuth } from "@/providers/AuthProvider";
import Toast from "react-native-toast-message";

export default function PostReplyInput({ postId }: { postId: string }) {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      createPost({
        content: text,
        user_id: user!.id,
        parent_id: postId,
      }),
    onSuccess: () => {
      setText("");
      Toast.show({
        text1: "Yanıt başarıyla oluşturuldu!",
        type: "success",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      Keyboard.dismiss();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      Toast.show({
        text1: `Bir hata oluştu! ${error.message}`,
        type: "error",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    },
  });

  return (
    <View className="p-4 bg-neutral-900">
      <View className="flex-row items-center gap-2 bg-neutral-800 p-2 rounded-xl shadow-md">
        <TextInput
          placeholder="Yeni yanıtınızı giriniz..."
          className="flex-1 p-3 text-white"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
          multiline
        />
        <AntDesign
          name="pluscircleo"
          size={24}
          disabled={isPending || text.length === 0}
          onPress={() => mutate()}
          color={text.length === 0 ? "gray" : "gainsboro"}
        />
      </View>
    </View>
  );
}
