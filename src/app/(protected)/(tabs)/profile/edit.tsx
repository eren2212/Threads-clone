import { useAuth } from "@/providers/AuthProvider";
import { getProfileById, updateProfile } from "@/services/profiles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateProfile(user!.id, { full_name: fullName, bio }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      router.back();
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

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  useEffect(() => {
    setFullName(profile?.full_name || "");
    setBio(profile?.bio || "");
  }, []);

  return (
    <View className="flex-1 p-4 gap-4">
      <Text className="text-white text-2xl font-bold">Adınız Soyadınız</Text>
      <TextInput
        placeholder="Adınız Soyadınız "
        className="text-white font-bold text-xl border-2 border-neutral-800 p-4 rounded-xl bg-neutral-800"
        value={fullName}
        onChangeText={setFullName}
      />
      <Text className="text-white text-2xl font-bold">Biyografiniz</Text>
      <TextInput
        placeholder="Biyografiniz"
        className="text-white font-bold text-xl border-2 border-neutral-800 p-4 rounded-xl bg-neutral-800"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
        className="flex-1"
      >
        <View className="mt-auto">
          <Pressable
            onPress={() => mutate()}
            disabled={
              isPending ||
              (fullName.trim() === (profile?.full_name || "").trim() &&
                bio.trim() === (profile?.bio || "").trim())
            }
            className={`rounded-full p-4 items-center my-4 justify-center ${
              fullName.trim() === (profile?.full_name || "").trim() &&
              bio.trim() === (profile?.bio || "").trim()
                ? "bg-gray-500"
                : "bg-white"
            }`}
          >
            <Text
              className={`font-bold ${
                fullName.trim() === (profile?.full_name || "").trim() &&
                bio.trim() === (profile?.bio || "").trim()
                  ? "text-gray-300"
                  : "text-black"
              }`}
            >
              Kaydet
            </Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text className="text-white font-bold text-xl">İptal</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
