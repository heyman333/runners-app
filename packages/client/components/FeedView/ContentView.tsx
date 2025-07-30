import styled from "@emotion/native";

const Container = styled.View`
  flex: 1;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #27272a;
`;

const ContentText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

export function ContentView() {
  return (
    <Container>
      <ContentText>
        아 뛰니까 너무 좋다 맨날 이렇게 뛰고 싶다 오늘날씨 짱짱 너무 좋아요!
      </ContentText>
    </Container>
  );
}
