import styled from "@emotion/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { Image } from "expo-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/IconSymbol";
import { CommentItem } from "./CommentItem";

const ContentContainer = styled(BottomSheetView)`
  flex: 1;
  background-color: #1f2937;
  height: 100%;
`;

const CommentTitle = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
`;

const CommentHeader = styled.View`
  padding: 28px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #374151;
  flex-shrink: 0;
`;

const Indicator = styled.View`
  width: 40px;
  height: 4px;
  background-color: #4b5563;
  border-radius: 2px;
  position: absolute;
  bottom: 0;
  align-self: center;
  margin-bottom: 16px;
`;

const CommentsScrollView = styled(ScrollView)`
  flex: 1;
  background-color: #1f2937;
  z-index: 1000;
`;

const CommentInputContainer = styled(Animated.View)`
  background-color: #1f2937;
  border-top-width: 1px;
  border-top-color: #374151;
  padding: 16px;
  flex-direction: row;
  align-items: flex-end;
  gap: 12px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const UserProfileImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const InputSection = styled.View`
  flex: 1;
  background-color: #374151;
  border-radius: 20px;
  padding: 12px 16px;
`;

const CommentInput = styled(TextInput)`
  color: #ffffff;
  font-size: 14px;
  min-height: 20px;
`;

const SendButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ disabled }) => (disabled ? "#4B5563" : "#3B82F6")};
  align-items: center;
  justify-content: center;
`;

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const CommentsBottomSheet = ({ visible, onClose }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [commentText, setCommentText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const insets = useSafeAreaInsets();

  const baseBottomOffset = insets.bottom;
  const bottomOffset = keyboardHeight > 0 ? keyboardHeight : baseBottomOffset;

  // Animation values
  const bottomPosition = useSharedValue(-300);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const handleSendComment = useCallback(() => {
    if (commentText.trim()) {
      setCommentText("");
    }
  }, [commentText]);

  const handleTextChange = useCallback((text: string) => {
    setCommentText(text);
  }, []);

  // Animated style for CommentInputContainer
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: bottomPosition.value,
    };
  });

  // Keyboard event listeners
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (event) => {
        bottomSheetModalRef.current?.expand();
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();

      // BottomSheetModal의 기본 애니메이션과 맞춰서 약간 지연 후 시작
      bottomPosition.value = withTiming(bottomOffset, {
        duration: 300, // BottomSheetModal과 비슷한 지속시간
        easing: Easing.elastic(1),
      });
    } else {
      bottomPosition.value = withTiming(-300, {
        duration: 200, // 조금 더 빠른 종료
        easing: Easing.elastic(1),
      });

      bottomSheetModalRef.current?.dismiss();
    }
  }, [bottomOffset, bottomPosition, visible]);

  const content = (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={["50%", "90%"]}
        backdropComponent={({ style }) => (
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={[style, { backgroundColor: "rgba(0,0,0,0.5)" }]} />
          </TouchableWithoutFeedback>
        )}
        handleComponent={null}
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: "hidden",
          zIndex: 1000,
          elevation: 1000,
        }}
        keyboardBehavior="extend"
        keyboardBlurBehavior="none"
        animationConfigs={{
          duration: 300,
          easing: Easing.elastic(1),
        }}
      >
        <ContentContainer>
          <CommentHeader>
            <CommentTitle>Comments</CommentTitle>
            <Indicator />
          </CommentHeader>
          <CommentsScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 82 }}
          >
            <CommentItem
              profileImage="https://placehold.co/40x40"
              nickname="사용자1"
              timeAgo="2시간 전"
              content="정말 좋은 게시물이네요! 감사합니다."
              likeCount={5}
              isLiked={false}
              onLike={() => console.log("좋아요 클릭")}
              onReply={() => console.log("답글 클릭")}
            />
            <CommentItem
              profileImage="https://placehold.co/40x40"
              nickname="사용자2"
              timeAgo="1시간 전"
              content="저도 같은 생각입니다. 유용한 정보 공유해주셔서 고맙습니다."
              likeCount={3}
              isLiked={true}
              onLike={() => console.log("좋아요 클릭")}
              onReply={() => console.log("답글 클릭")}
            />
            <CommentItem
              profileImage="https://placehold.co/40x40"
              nickname="사용자3"
              timeAgo="30분 전"
              content="맞습니다! 정말 도움이 되네요."
              likeCount={1}
              isLiked={false}
              isReply={true}
              onLike={() => console.log("좋아요 클릭")}
              onReply={() => console.log("답글 클릭")}
            />
          </CommentsScrollView>
        </ContentContainer>
      </BottomSheetModal>
      <CommentInputContainer style={animatedStyle}>
        <UserProfileImage source="https://placehold.co/32x32" />
        <InputSection>
          <CommentInput
            multiline
            placeholder="댓글을 입력하세요..."
            placeholderTextColor="#9CA3AF"
            value={commentText}
            onChangeText={handleTextChange}
            textAlignVertical="top"
            scrollEnabled={false}
          />
        </InputSection>
        <SendButton disabled={!commentText.trim()} onPress={handleSendComment}>
          <IconSymbol
            name="paperplane.fill"
            size={16}
            color={commentText.trim() ? "#FFFFFF" : "#9CA3AF"}
          />
        </SendButton>
      </CommentInputContainer>
    </BottomSheetModalProvider>
  );

  return <Portal>{content}</Portal>;
};
