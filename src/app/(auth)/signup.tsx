import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Lütfen email ve şifrenizi giriniz");
      return;
    }

    try {
      setIsLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({ email, password });

      if (error) {
        Alert.alert(error.message);
        return;
      } else {
        Toast.show({
          text1: "Hesap oluşturuldu!",
          text2: "Lütfen e-postanıza gelen doğrulama linkini kontrol ediniz.",
          type: "success",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // TODO: Add proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-neutral-900 px-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-8 text-white">
          Hesap oluştur
        </Text>

        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">
              Email
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white  focus:border-blue-500"
              placeholder="Emailinizi giriniz"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-300 mb-1">
              Şifre
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white  focus:border-blue-500"
              placeholder="Şifrenizi giriniz"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="w-full bg-white py-3 rounded-lg mt-6"
            activeOpacity={0.8}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text className="text-black text-center font-semibold">
              {isLoading ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-400">Zaten bir hesabınız var mı? </Text>
            <Link href="/login" asChild>
              <Pressable>
                <Text className="text-blue-400 font-medium">Giriş yap</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
