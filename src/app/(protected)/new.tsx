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

export default function NewScreen() {
  const [content, setContent] = useState("");

  return (
    <SafeAreaView className="p-4 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
        <Text className="text-white text-2xl font-bold">username</Text>

        <TextInput
          placeholder="Ne Düşünüyorsun?"
          className="text-white text-lg"
          multiline
          numberOfLines={4}
          placeholderTextColor="gray"
          onChangeText={setContent}
        />

        <View className="mt-auto">
          <Pressable
            onPress={() => console.log(content)}
            className="bg-white rounded-full px-4 py-2 self-end"
          >
            <Text className="text-black font-bold">Paylaş</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
