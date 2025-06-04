import "../../global.css";
import { Slot } from "expo-router";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/providers/AuthProvider";

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "white",
    card: "#101010",
  },
};
export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <AuthProvider>
        <Slot />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  );
}
