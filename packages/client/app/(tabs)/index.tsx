import { CommentsBottomSheet } from "@/components/CommentsBottomSheet";
import { FeedView } from "@/components/FeedView";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { Header } from "@/components/ui/Header";
import styled from "@emotion/native";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const [commentsBottomSheetVisible, setCommentsBottomSheetVisible] =
    useState(false);

  // Mock data for FlatList
  const feedData: FeedItem[] = [
    { id: "1", type: "feed" },
    { id: "2", type: "feed" },
    { id: "3", type: "feed" },
  ];

  const handleCommentsBottomSheetClose = () => {
    setCommentsBottomSheetVisible(false);
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
      <GestureHandlerRootView>
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
        <CommentsBottomSheet
          visible={commentsBottomSheetVisible}
          onClose={handleCommentsBottomSheetClose}
        />
        <FloatingActionButton onPress={handleCreateFeed} />
      </GestureHandlerRootView>
    </Container>
  );
}
