import UserAvatarPicker from "@/components/UserAvatarPicker";
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
  const [avatarUrl, setAvatarUrl] = useState("");

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getProfileById(user!.id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateProfile(user!.id, {
        full_name: fullName,
        bio,
        id: user!.id,
      }),
    onSuccess: () => {
      Toast.show({
        text1: "Profil güncellendi!",
        type: "success",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      router.back();
    },
  });

  useEffect(() => {
    setFullName(profile?.full_name || "");
    setBio(profile?.bio || "");
    setAvatarUrl(profile?.avatar_url || "");
  }, [profile?.id]);

  return (
    <View className="flex-1 p-4 gap-4">
      <View className="border-2 border-neutral-800 p-4 rounded-full items-center justify-center">
        <UserAvatarPicker currentAvatar={avatarUrl} onUpload={setAvatarUrl} />
      </View>
      <Text className="text-white text-2xl font-bold">Adınız Soyadınız</Text>
      <TextInput
        placeholder="Adınız Soyadınız "
        className="text-white font-bold text-xl border-2 border-neutral-800 p-4 rounded-xl "
        value={fullName}
        onChangeText={setFullName}
      />
      <Text className="text-white text-2xl font-bold">Biyografiniz</Text>
      <TextInput
        placeholder="Biyografiniz"
        className="text-white font-bold text-xl border-2 border-neutral-800 p-4 rounded-xl "
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
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
