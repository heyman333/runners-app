import styled from "@emotion/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #1e1e1e;
  padding-horizontal: 16px;
  padding-bottom: 12px;
  z-index: 1000;
  elevation: 4;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 44px;
`;

const LeftSection = styled.View`
  flex-direction: row;
`;

const BackButton = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  justify-content: center;
`;

const TitleContainer = styled.View`
  align-items: center;
  margin-horizontal: 16px;
  flex: 1;
`;

const Title = styled.Text<{ color: string }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

const RightSection = styled.View``;

interface BackHeaderProps {
  title?: string;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export function BackHeader({
  title,
  onBackPress,
  rightAction,
}: BackHeaderProps) {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <HeaderContainer style={{ paddingTop: insets.top }}>
      <HeaderContent>
        <LeftSection>
          <BackButton onPress={handleBackPress} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </BackButton>
        </LeftSection>

        {title && (
          <TitleContainer>
            <Title color="#fff">{title}</Title>
          </TitleContainer>
        )}

        <RightSection>{rightAction}</RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
}
