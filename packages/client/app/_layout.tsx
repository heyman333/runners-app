import { PortalHost, PortalProvider } from "@gorhom/portal";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

import { LoginModal } from "@/components/LoginModal";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useEffect(() => {
    initializeKakaoSDK("3af1744c2b8498acae6298953644b983");
  }, []);

  return (
    <GestureHandlerRootView>
      <PortalProvider>
        <KeyboardProvider>
          <AuthProvider>
            <ThemeProvider value={DarkTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="create-feed" />
              </Stack>
              <StatusBar style="auto" />
              <LoginModal />
              <PortalHost name="comments-bottom-sheet" />
            </ThemeProvider>
          </AuthProvider>
        </KeyboardProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
