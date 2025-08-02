import { View } from "react-native";

import { Header } from "@/components/ui/Header";

export default function TabTwoScreen() {
  const handleNotificationPress = () => {
    console.log("프로필 화면 - 알림 버튼 클릭");
  };

  const handleMessagePress = () => {
    console.log("프로필 화면 - 메시지 버튼 클릭");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        hasNewNotifications={true}
        hasNewMessages={true}
        onNotificationPress={handleNotificationPress}
        onMessagePress={handleMessagePress}
      />
    </View>
  );
}
