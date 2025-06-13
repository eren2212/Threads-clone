import { schedulePushNotification } from "@/providers/NotificationsProvider";
import { Text } from "react-native";

export default function NotificationsScreen() {
  return (
    <Text
      onPress={schedulePushNotification}
      className="text-2xl font-bold text-white"
    >
      Test Notifications
    </Text>
  );
}
