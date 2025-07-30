import styled from "@emotion/native";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  padding: 12px;
`;

const ProfileImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ProfileName = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
`;

const Location = styled.Text`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
`;

const MoreButton = styled(Pressable)`
  transform: rotate(90deg);
`;

export function ProfileView() {
  return (
    <Container>
      <ProfileInfoView>
        <ProfileImage source="https://placehold.co/40" />
        <View>
          <ProfileName>Profile</ProfileName>
          <Location>Central Park, NY • 20m ago</Location>
        </View>
      </ProfileInfoView>
      <MoreButton hitSlop={10} onPress={() => alert("more")}>
        <IconSymbol name="ellipsis" size={24} color="#A0A0A0" />
      </MoreButton>
    </Container>
  );
}
