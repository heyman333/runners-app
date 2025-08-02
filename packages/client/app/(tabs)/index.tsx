import { CommentsBottomSheet } from "@/components/CommentsBottomSheet";
import { FeedView } from "@/components/FeedView";
import styled from "@emotion/native";
import { useState } from "react";
import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Container = styled.View`
  flex: 1;
`;

const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

export default function HomeScreen() {
  const [commentsBottomSheetVisible, setCommentsBottomSheetVisible] =
    useState(false);

  const handleCommentsBottomSheetClose = () => {
    setCommentsBottomSheetVisible(false);
  };

  return (
    <Container>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollViewContainer>
          <FeedView />
          <Button
            title="바텀시트 열기"
            onPress={() => setCommentsBottomSheetVisible(true)}
          />
        </ScrollViewContainer>
        <CommentsBottomSheet
          visible={commentsBottomSheetVisible}
          onClose={handleCommentsBottomSheetClose}
        />
      </GestureHandlerRootView>
    </Container>
  );
}
