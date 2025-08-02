import { BackHeader } from "@/components/ui/BackHeader";
import styled from "@emotion/native";
import { Button, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View<{ marginTop: number }>`
  flex: 1;
  margin-top: ${(props) => props.marginTop}px;
  padding: 16px;
`;

export default function CreateFeed() {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 44 + 12; // safe area + header content + padding

  return (
    <Container>
      <BackHeader
        title="Share Your Run"
        rightAction={<Button title="Save" onPress={() => {}} />}
      />
      <Content marginTop={headerHeight}>
        <Text style={{ color: "white" }}>피드 내용을 작성하세요</Text>
      </Content>
    </Container>
  );
}
