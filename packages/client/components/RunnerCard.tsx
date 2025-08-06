import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import { Image } from "expo-image";
import { Text, TouchableOpacity } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

interface RunnerCardProps {
  userPhoto: string;
  name: string;
  pace: string;
  runningStyles: string[];
  isFollowing: boolean;
  onFollowPress: () => void;
  onProfilePress: () => void;
}

interface StyledButtonProps {
  backgroundColor: string;
  isFollowing: boolean;
}

const Container = styled.View`
  border-radius: 16px;
  padding: 20px;
  margin: 8px 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
  background-color: #1e1e1e;
`;

const TopSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const UserPhoto = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-right: 12px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const NameAndPaceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 24px;
`;

const PaceText = styled(Text)`
  color: #6c63ff;
  font-size: 14px;
  font-weight: 500;
`;

const StyleTagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
  gap: 8px;
`;

const StyleTag = styled.View<{ backgroundColor: string }>`
  background-color: #2d2d2d;
  border-radius: 16px;
  padding: 6px 12px;
`;

const StyleTagText = styled(Text)<{ color: string }>`
  color: #a0a0a0;
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
    props.isFollowing ? "transparent" : props.backgroundColor};
  border: 2px solid ${(props) => props.backgroundColor};
  border-radius: 8px;
  padding: 8px;
  align-items: center;
`;

const FollowButtonText = styled(Text)<{ color: string; isFollowing: boolean }>`
  color: ${(props) => (props.isFollowing ? props.color : "#ffffff")};
  font-size: 14px;
  font-weight: 600;
`;

const ProfileButton = styled(TouchableOpacity)`
  flex: 1;
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  background-color: #2d2d2d;
`;

const ProfileButtonText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: 600;
`;

const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LocationText = styled(Text)`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
`;

const PaceContainer = styled.View`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  justify-content: center;
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
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const tagBackground = useThemeColor(
    { light: "#f0f0f0", dark: "#2a2a2a" },
    "background"
  );

  return (
    <Container>
      <TopSection>
        <UserPhoto source={userPhoto} contentFit="cover" />
        <UserInfo>
          <NameAndPaceContainer>
            <UserName color={textColor}>{name}</UserName>
            <PaceContainer>
              <PaceText>{pace} pace</PaceText>
            </PaceContainer>
          </NameAndPaceContainer>
          <LocationContainer>
            <IconSymbol
              name="location.north.fill"
              size={12}
              color={tintColor}
            />
            <LocationText>1.2km away</LocationText>
          </LocationContainer>
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
            {isFollowing ? "팔로잉" : "팔로우"}
          </FollowButtonText>
        </FollowButton>

        <ProfileButton onPress={onProfilePress}>
          <ProfileButtonText color={textColor}>프로필 보기</ProfileButtonText>
        </ProfileButton>
      </ButtonsContainer>
    </Container>
  );
}
