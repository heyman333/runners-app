import { useAuth } from "@/contexts/AuthContext";
import { useCommentBottomSheet } from "@/stores/commentStore";
import styled from "@emotion/native";
import { Pressable, Text } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 12px;
  justify-content: space-between;
`;

const ActionItem = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ActionItemText = styled(Text)`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const ActionItemContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export function ActionView() {
  const { isAuthenticated, showLoginModal } = useAuth();
  const { openCommentSheet } = useCommentBottomSheet();

  const handleLike = () => {
    if (!isAuthenticated) {
      showLoginModal();
      return;
    }

    console.log("like");
  };

  const handleComment = () => {
    openCommentSheet("post-id-123");
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      showLoginModal();
      return;
    }
  };

  return (
    <Container>
      <ActionItemContainer>
        <ActionItem onPress={handleLike}>
          <IconSymbol name="heart" size={24} color="#A0A0A0" />
          <ActionItemText>100</ActionItemText>
        </ActionItem>
        <ActionItem onPress={handleComment}>
          <IconSymbol name="message" size={24} color="#A0A0A0" />
          <ActionItemText>24</ActionItemText>
        </ActionItem>
      </ActionItemContainer>

      <Pressable onPress={handleBookmark}>
        <IconSymbol name="bookmark" size={24} color="#A0A0A0" />
      </Pressable>
    </Container>
  );
}
