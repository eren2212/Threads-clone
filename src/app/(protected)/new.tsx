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

export default function NewScreen() {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const onSubmit = async () => {
    if (!text || !user) return;

    const { data, error } = await supabase.from("posts").insert({
      content: text,
      user_id: user.id,
    });

    if (error) {
      console.log(error);
    } else {
      Toast.show({
        text1: "Post oluşturuldu!",
        type: "success",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
      router.push("/");
    }

    setText("");
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

        <View className="mt-auto">
          <Pressable
            onPress={onSubmit}
            className="bg-white rounded-full px-4 py-2 self-end"
          >
            <Text className="text-black font-bold">Paylaş</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
