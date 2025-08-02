import styled from "@emotion/native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

interface CommentItemProps {
  profileImage: string;
  nickname: string;
  timeAgo: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  isReply?: boolean;
  onLike: () => void;
  onReply: () => void;
}

export const CommentItem = ({
  profileImage,
  nickname,
  timeAgo,
  content,
  likeCount,
  isLiked,
  isReply = false,
  onLike,
  onReply,
}: CommentItemProps) => {
  return (
    <Container isReply={isReply}>
      <ProfileSection>
        <ProfileImage source={profileImage} />
        <ContentSection>
          <UserInfo>
            <Nickname>{nickname}</Nickname>
            <TimeAgo>{timeAgo}</TimeAgo>
          </UserInfo>
          <Content>{content}</Content>
          <ActionSection>
            <ActionButton onPress={onLike}>
              <HeartIcon
                name={isLiked ? "heart.fill" : "heart"}
                size={16}
                color={isLiked ? "#EF4444" : "9CA3AF"}
              />
              <ActionText isActive={isLiked}>
                {likeCount > 0 && likeCount}
              </ActionText>
            </ActionButton>
            <ActionButton onPress={onReply}>
              <ActionText>Reply</ActionText>
            </ActionButton>
          </ActionSection>
        </ContentSection>
      </ProfileSection>
    </Container>
  );
};

const Container = styled.View<{ isReply?: boolean }>`
  padding: 16px;
  margin-left: ${({ isReply }) => (isReply ? "48px" : "0px")};
`;

const ProfileSection = styled.View`
  flex-direction: row;
`;

const ProfileImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 12px;
`;

const ContentSection = styled.View`
  flex: 1;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const Nickname = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin-right: 8px;
`;

const TimeAgo = styled.Text`
  color: #9ca3af;
  font-size: 12px;
`;

const Content = styled.Text`
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
`;

const ActionSection = styled.View`
  flex-direction: row;
`;

const ActionButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  justify-content: center;
`;

const ActionText = styled.Text<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? "#EF4444" : "#9ca3af")};
  font-size: 12px;
  font-weight: 500;
`;

const HeartIcon = styled(IconSymbol)`
  margin-right: 4px;
`;
