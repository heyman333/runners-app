import { useAuth } from "@/contexts/AuthContext";
import styled from "@emotion/native";
import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconKakao } from "./icons/IconKakao";

const Overlay = styled.View`
  flex: 1;
  background-color: #121212;
  justify-content: flex-end;
`;

const ModalContainer = styled(ThemedView)`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background-color: #121212;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 320px;
`;

const LogoContainer = styled.View`
  margin-bottom: 60px;
  align-items: center;
`;

const Subtitle = styled(ThemedText)`
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  color: #9ca3af;
`;

const ButtonContainer = styled.View`
  width: 100%;
  gap: 16px;
`;

const KakaoButton = styled.Pressable`
  background-color: #fee500;
  width: 100%;
  padding-vertical: 18px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const KakaoButtonText = styled(ThemedText)`
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const CancelButton = styled.Pressable`
  padding-vertical: 18px;
  width: 100%;
`;

const CancelButtonText = styled(ThemedText)`
  font-size: 16px;
  text-align: center;
  opacity: 0.6;
`;

const TextContainer = styled.View`
  gap: 7px;
  margin-bottom: 40px;
`;

const TextMain = styled.Text`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`;

const TextSub = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #9ca3af;
`;

export function LoginModal() {
  const { isLoginModalVisible, hideLoginModal, login } = useAuth();

  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 로직 구현
      // import { login as kakaoLogin } from '@react-native-kakao/user';
      // const result = await kakaoLogin();

      // 임시로 로그인 성공 처리
      login();
    } catch (error) {
      console.error("Kakao login failed:", error);
    }
  };

  return (
    <Modal
      transparent
      visible={isLoginModalVisible}
      animationType="slide"
      onRequestClose={hideLoginModal}
    >
      <TouchableWithoutFeedback onPress={hideLoginModal}>
        <Overlay>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContainer>
              <ContentContainer>
                <LogoContainer>
                  <Subtitle>Connect. Run. Share.</Subtitle>
                </LogoContainer>
                <TextContainer>
                  <TextMain>Welcome Back</TextMain>
                  <TextSub>Sign in to continue your running journey</TextSub>
                </TextContainer>

                <ButtonContainer>
                  <KakaoButton onPress={handleKakaoLogin}>
                    <IconKakao />
                    <KakaoButtonText>카카오로 계속하기</KakaoButtonText>
                  </KakaoButton>

                  <CancelButton onPress={hideLoginModal}>
                    <CancelButtonText>나중에 하기</CancelButtonText>
                  </CancelButton>
                </ButtonContainer>
              </ContentContainer>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
