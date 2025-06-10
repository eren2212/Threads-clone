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
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      if (!text.trim() && !image) {
        throw new Error("Lütfen bir şeyler yazın veya bir görsel seçin");
      }

      let imagePath = undefined;
      if (image) {
        imagePath = await uploadImage();
      }
      return createPost({
        content: text,
        user_id: user!.id,
        images: imagePath ? [imagePath] : undefined,
      });
    },
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
        text1: "Bir hata oluştu!" + error.message,
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
      setImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

    const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, arraybuffer, {
        contentType: image.mimeType ?? "image/jpeg",
      });
    if (uploadError) {
      throw uploadError;
    }

    return data.path;
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
          className="text-white text-lg my-2"
          multiline
          numberOfLines={4}
        />

        {image && (
          <Image
            source={{ uri: image.uri }}
            className="w-1/2 rounded-lg my-4"
            style={{ aspectRatio: image.width / image.height }}
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

        {error && <Text className="text-red-500">{error.message}</Text>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
