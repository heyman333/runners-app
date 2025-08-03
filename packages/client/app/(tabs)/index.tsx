import { CommentsBottomSheet } from "@/components/CommentsBottomSheet";
import { FeedView } from "@/components/FeedView";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { Header } from "@/components/ui/Header";
import { useCommentBottomSheet } from "@/stores/commentStore";
import styled from "@emotion/native";
import { router } from "expo-router";
import { FlatList, ListRenderItem } from "react-native";

const Container = styled.View`
  flex: 1;
`;

type FeedItem = {
  id: string;
  type: string;
};

const StyledFlatList = styled(FlatList<FeedItem>)`
  flex: 1;
`;

export default function HomeScreen() {
  const { isOpen, closeCommentSheet } = useCommentBottomSheet();

  // Mock data for FlatList
  const feedData: FeedItem[] = [
    { id: "1", type: "feed" },
    { id: "2", type: "feed" },
    { id: "3", type: "feed" },
  ];

  const handleCommentsBottomSheetClose = () => {
    closeCommentSheet();
  };

  const handleNotificationPress = () => {
    console.log("알림 버튼 클릭");
  };

  const handleMessagePress = () => {
    console.log("메시지 버튼 클릭");
  };

  const handleCreateFeed = () => {
    router.navigate("/create-feed");
  };

  const renderFeedItem: ListRenderItem<FeedItem> = ({ item }) => {
    return <FeedView />;
  };

  return (
    <Container>
      <Header
        hasNewNotifications={true}
        hasNewMessages={false}
        onNotificationPress={handleNotificationPress}
        onMessagePress={handleMessagePress}
      />
      <StyledFlatList
        data={feedData}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
      />
      <FloatingActionButton onPress={handleCreateFeed} />
      <CommentsBottomSheet
        visible={isOpen}
        onClose={handleCommentsBottomSheetClose}
      />
    </Container>
  );
}
