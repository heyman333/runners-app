import { RunnerCard } from "@/components/RunnerCard";
import { Header } from "@/components/ui/Header";
import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import { useState } from "react";
import { FlatList, ListRenderItem, Text } from "react-native";

const Container = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding-top: 16px;
`;

const SectionTitle = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 22px;
  font-weight: 700;
  margin: 0 16px 16px 16px;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  text-align: center;
  opacity: 0.6;
`;

interface Runner {
  id: string;
  userPhoto: string;
  name: string;
  pace: string;
  runningStyles: string[];
  isFollowing: boolean;
}

export default function ExploreScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const [runners, setRunners] = useState<Runner[]>([
    {
      id: "1",
      userPhoto: "https://placehold.co/120x120",
      name: "김러너",
      pace: "5:30 /km",
      runningStyles: ["아침러닝", "트랙러닝", "초보자"],
      isFollowing: false,
    },
    {
      id: "2",
      userPhoto: "https://placehold.co/120x120",
      name: "박달리기",
      pace: "4:45 /km",
      runningStyles: ["마라톤", "인터벌", "고수"],
      isFollowing: true,
    },
    {
      id: "3",
      userPhoto: "https://placehold.co/120x120",
      name: "이조깅",
      pace: "6:00 /km",
      runningStyles: ["조깅", "힐링러닝", "초보자"],
      isFollowing: false,
    },
    {
      id: "4",
      userPhoto: "https://placehold.co/120x120",
      name: "최스피드",
      pace: "4:20 /km",
      runningStyles: ["스피드", "단거리", "경쟁러닝"],
      isFollowing: false,
    },
  ]);

  const handleNotificationPress = () => {
    console.log("탐색 화면 - 알림 버튼 클릭");
  };

  const handleMessagePress = () => {
    console.log("탐색 화면 - 메시지 버튼 클릭");
  };

  const handleFollowPress = (runnerId: string) => {
    setRunners(prev => 
      prev.map(runner => 
        runner.id === runnerId 
          ? { ...runner, isFollowing: !runner.isFollowing }
          : runner
      )
    );
  };

  const handleProfilePress = (runnerId: string) => {
    console.log("프로필 보기:", runnerId);
  };

  const renderRunnerItem: ListRenderItem<Runner> = ({ item }) => (
    <RunnerCard
      userPhoto={item.userPhoto}
      name={item.name}
      pace={item.pace}
      runningStyles={item.runningStyles}
      isFollowing={item.isFollowing}
      onFollowPress={() => handleFollowPress(item.id)}
      onProfilePress={() => handleProfilePress(item.id)}
    />
  );

  return (
    <Container backgroundColor={backgroundColor}>
      <Header
        hasNewNotifications={false}
        hasNewMessages={true}
        onNotificationPress={handleNotificationPress}
        onMessagePress={handleMessagePress}
      />
      
      <ContentContainer>
        <SectionTitle color={textColor}>근처 러너들</SectionTitle>
        
        {runners.length > 0 ? (
          <FlatList
            data={runners}
            renderItem={renderRunnerItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
          <EmptyState>
            <EmptyText color={textColor}>
              근처에서 러닝하는 사람들을 찾을 수 없습니다.{'\n'}
              위치 권한을 확인해보세요.
            </EmptyText>
          </EmptyState>
        )}
      </ContentContainer>
    </Container>
  );
}
