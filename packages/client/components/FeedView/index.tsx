import styled from "@emotion/native";
import { Image } from "expo-image";
import { ActionView } from "./ActionView";
import { ContentView } from "./ContentView";
import { ProfileView } from "./ProfileView";
import { RecordView } from "./RecordView";

const Container = styled.View`
  flex: 1;
  background-color: #1e1e1e;
`;

const MainImage = styled(Image)`
  width: 100%;
  aspect-ratio: 390 / 256;
`;

export function FeedView() {
  return (
    <Container>
      <ProfileView />
      <MainImage source="https://placehold.co/1000" />
      <RecordView />
      <ContentView />
      <ActionView />
    </Container>
  );
}
