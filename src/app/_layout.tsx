import "../../global.css";
import { Slot } from "expo-router";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationsProvider from "@/providers/NotificationsProvider";

const queryClient = new QueryClient();

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "white",
    card: "#101010",
    background: "#101010",
  },
};
export default function RootLayout() {
  return (
    <ThemeProvider value={MyTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationsProvider>
            <Slot />
            <Toast />
          </NotificationsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
