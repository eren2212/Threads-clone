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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/services/post";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function NewScreen() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      createPost({
        content: text,
        user_id: user!.id,
      }),
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

        {image && (
          <Image
            source={{ uri: image }}
            className="w-1/2 aspect-square rounded-lg my-4"
          />
        )}

        <View className="flex-row items-center gap-2">
          <Ionicons
            onPress={pickImage}
            name="images-outline"
            size={24}
            color={image ? "gray" : "gainsboro"}
          />
        </View>

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
