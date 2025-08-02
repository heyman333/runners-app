import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "./Badge";

interface HeaderProps {
  hasNewNotifications?: boolean;
  hasNewMessages?: boolean;
  onNotificationPress?: () => void;
  onMessagePress?: () => void;
  showLeftSpace?: boolean;
}

interface StyledHeaderProps {
  borderBottomColor: string;
}

const StyledContainer = styled(SafeAreaView)`
  background-color: #1e1e1e;
`;

const StyledHeader = styled.View<StyledHeaderProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
`;

const LeftSpace = styled.View`
  flex: 1;
`;

const RightButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled(TouchableOpacity)`
  padding: 4px;
  position: relative;
`;

export function Header({
  hasNewNotifications = false,
  hasNewMessages = false,
  onNotificationPress,
  onMessagePress,
  showLeftSpace = true,
}: HeaderProps) {
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor(
    { light: "#E5E5E5", dark: "#2A2A2A" },
    "background"
  );

  return (
    <StyledContainer>
      <StyledHeader borderBottomColor={borderColor}>
        {showLeftSpace && <LeftSpace />}

        <RightButtons>
          <IconButton onPress={onNotificationPress}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={iconColor}
            />
            <Badge visible={hasNewNotifications} text="N" size={16} />
          </IconButton>

          <IconButton onPress={onMessagePress}>
            <Ionicons name="mail-outline" size={24} color={iconColor} />
            <Badge visible={hasNewMessages} text="N" size={16} />
          </IconButton>
        </RightButtons>
      </StyledHeader>
    </StyledContainer>
  );
}
