import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import { Image } from "expo-image";
import { TouchableOpacity, Text } from "react-native";

interface RunnerCardProps {
  userPhoto: string;
  name: string;
  pace: string;
  runningStyles: string[];
  isFollowing: boolean;
  onFollowPress: () => void;
  onProfilePress: () => void;
}

interface StyledContainerProps {
  backgroundColor: string;
  borderColor: string;
}

interface StyledButtonProps {
  backgroundColor: string;
  isFollowing: boolean;
}

const Container = styled.View<StyledContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 16px;
  padding: 20px;
  margin: 8px 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
`;

const TopSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const UserPhoto = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 16px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const PaceText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
`;

const PaceLabel = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 400;
  opacity: 0.6;
  margin-bottom: 2px;
`;

const StyleTagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
  gap: 8px;
`;

const StyleTag = styled.View<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 16px;
  padding: 6px 12px;
`;

const StyleTagText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 600;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const FollowButton = styled(TouchableOpacity)<StyledButtonProps>`
  flex: 1;
  background-color: ${(props) => 
    props.isFollowing ? 'transparent' : props.backgroundColor};
  border: 2px solid ${(props) => props.backgroundColor};
  border-radius: 12px;
  padding: 12px;
  align-items: center;
`;

const FollowButtonText = styled(Text)<{ color: string; isFollowing: boolean }>`
  color: ${(props) => props.isFollowing ? props.color : '#ffffff'};
  font-size: 14px;
  font-weight: 600;
`;

const ProfileButton = styled(TouchableOpacity)<{ borderColor: string }>`
  flex: 1;
  background-color: transparent;
  border: 2px solid ${(props) => props.borderColor};
  border-radius: 12px;
  padding: 12px;
  align-items: center;
`;

const ProfileButtonText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 600;
`;

export function RunnerCard({
  userPhoto,
  name,
  pace,
  runningStyles,
  isFollowing,
  onFollowPress,
  onProfilePress,
}: RunnerCardProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({ light: "#e0e0e0", dark: "#333" }, "text");
  const tagBackground = useThemeColor(
    { light: "#f0f0f0", dark: "#2a2a2a" },
    "background"
  );

  return (
    <Container backgroundColor={backgroundColor} borderColor={borderColor}>
      <TopSection>
        <UserPhoto source={{ uri: userPhoto }} />
        <UserInfo>
          <UserName color={textColor}>{name}</UserName>
          <PaceLabel color={textColor}>평균 페이스</PaceLabel>
          <PaceText color={textColor}>{pace}</PaceText>
        </UserInfo>
      </TopSection>

      <StyleTagsContainer>
        {runningStyles.map((style, index) => (
          <StyleTag key={index} backgroundColor={tagBackground}>
            <StyleTagText color={tintColor}>{style}</StyleTagText>
          </StyleTag>
        ))}
      </StyleTagsContainer>

      <ButtonsContainer>
        <FollowButton
          backgroundColor={tintColor}
          isFollowing={isFollowing}
          onPress={onFollowPress}
        >
          <FollowButtonText color={tintColor} isFollowing={isFollowing}>
            {isFollowing ? '팔로잉' : '팔로우'}
          </FollowButtonText>
        </FollowButton>

        <ProfileButton borderColor={borderColor} onPress={onProfilePress}>
          <ProfileButtonText color={textColor}>프로필 보기</ProfileButtonText>
        </ProfileButton>
      </ButtonsContainer>
    </Container>
  );
}