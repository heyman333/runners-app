import { BackHeader } from "@/components/ui/BackHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as z from "zod";

const createFeedSchema = z.object({
  distance: z
    .string()
    .min(1, "거리를 입력해주세요")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "올바른 거리를 입력해주세요",
    }),
  time: z
    .string()
    .min(1, "시간을 입력해주세요")
    .refine(
      (val) => {
        const timeRegex = /^\d{1,2}:\d{2}$/;
        return timeRegex.test(val);
      },
      {
        message: "올바른 시간 형식을 입력해주세요 (예: 25:30)",
      }
    ),
  location: z.string().min(1, "위치를 입력해주세요"),
  caption: z.string().optional(),
});

type CreateFeedFormData = z.infer<typeof createFeedSchema>;

interface StyledContainerProps {
  backgroundColor: string;
}

interface StyledContentProps {
  marginTop: number;
  backgroundColor: string;
}

interface StyledInputProps {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

interface StyledButtonProps {
  backgroundColor: string;
  borderColor: string;
}

const Container = styled.View<StyledContainerProps>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const Content = styled(KeyboardAwareScrollView)<StyledContentProps>`
  flex: 1;
  margin-top: ${(props) => props.marginTop}px;
  padding: 16px;
  background-color: ${(props) => props.backgroundColor};
`;

const ShareButton = styled(Pressable)`
  background-color: #6c63ff;
  padding: 12px 16px;
  border-radius: 12px;
`;

const ShareButtonText = styled(Text)`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const SectionTitle = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  margin-top: 20px;
`;

const PhotoUploadContainer = styled(TouchableOpacity)<StyledButtonProps>`
  height: 200px;
  border: 2px dashed ${(props) => props.borderColor};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${(props) => props.backgroundColor};
`;

const PhotoUploadText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  margin-top: 8px;
  font-weight: 600;
`;

const UploadedImage = styled(Image)`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const RunDataContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RunDataItem = styled.View`
  flex: 1;
  margin: 0 4px;
`;

const RunDataLabel = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const RunDataInput = styled(TextInput)<StyledInputProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  text-align: center;
`;

const LocationInput = styled(TextInput)<StyledInputProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const CaptionInput = styled(TextInput)<StyledInputProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  height: 100px;
  text-align-vertical: top;
`;

const ErrorText = styled(Text)`
  color: #ff4444;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
`;

const ToggleContainer = styled.View<{
  backgroundColor: string;
  borderColor: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
  border: 1px solid ${(props: { borderColor: string }) => props.borderColor};
`;

const ToggleLabel = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 600;
  flex: 1;
`;

const ToggleButton = styled(TouchableOpacity)<{ isActive: boolean }>`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props) => (props.isActive ? "#6c63ff" : "#e0e0e0")};
  justify-content: center;
  align-items: ${(props) => (props.isActive ? "flex-end" : "flex-start")};
  padding: 2px;
`;

const ToggleThumb = styled.View<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: white;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
  margin: 0 2px;
`;

export default function CreateFeed() {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 44 + 12;

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({ light: "#e0e0e0", dark: "#333" }, "text");
  const inputBackground = useThemeColor(
    { light: "#f5f5f5", dark: "#2a2a2a" },
    "background"
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pace, setPace] = useState("");
  const [isPersonalBest, setIsPersonalBest] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateFeedFormData>({
    resolver: zodResolver(createFeedSchema),
    defaultValues: {
      distance: "",
      time: "",
      location: "",
      caption: "",
    },
  });

  const watchedDistance = watch("distance");
  const watchedTime = watch("time");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("권한 필요", "사진에 접근하기 위해 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const calculatePace = (dist: string, timeStr: string) => {
    if (!dist || !timeStr) return "";
    const distance = parseFloat(dist);
    const [minutes, seconds] = timeStr.split(":").map(Number);
    const totalMinutes = minutes + (seconds || 0) / 60;
    const paceMinutes = totalMinutes / distance;
    const paceMin = Math.floor(paceMinutes);
    const paceSec = Math.round((paceMinutes - paceMin) * 60);
    return `${paceMin}:${paceSec.toString().padStart(2, "0")}`;
  };

  const handleDistanceChange = (value: string) => {
    const calculatedPace = calculatePace(value, watchedTime);
    if (calculatedPace) setPace(calculatedPace);
    return value;
  };

  const handleTimeChange = (value: string) => {
    const calculatedPace = calculatePace(watchedDistance, value);
    if (calculatedPace) setPace(calculatedPace);
    return value;
  };

  const onSubmit = (data: CreateFeedFormData) => {
    if (!selectedImage) {
      Alert.alert("입력 확인", "사진을 추가해주세요.");
      return;
    }

    console.log("Form data:", data);
    console.log("Personal best:", isPersonalBest);
    Alert.alert(
      "공유 완료",
      `러닝 기록이 공유되었습니다!${
        isPersonalBest ? " (최고기록으로 저장)" : ""
      }`
    );
  };

  return (
    <Container backgroundColor={backgroundColor}>
      <BackHeader
        title="Share Your Run"
        rightAction={
          <ShareButton onPress={handleSubmit(onSubmit)}>
            <ShareButtonText>공유</ShareButtonText>
          </ShareButton>
        }
      />
      <Content
        marginTop={headerHeight}
        backgroundColor={backgroundColor}
        showsVerticalScrollIndicator={false}
        bottomOffset={140}
        extraKeyboardSpace={40}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
      >
        {selectedImage ? (
          <Pressable onPress={pickImage}>
            <UploadedImage source={{ uri: selectedImage }} />
          </Pressable>
        ) : (
          <PhotoUploadContainer
            backgroundColor={inputBackground}
            borderColor={borderColor}
            onPress={pickImage}
          >
            <Ionicons name="camera-outline" size={32} color={tintColor} />
            <PhotoUploadText color={textColor}>사진 추가</PhotoUploadText>
          </PhotoUploadContainer>
        )}

        <SectionTitle color={textColor}>Run Statistics</SectionTitle>
        <RunDataContainer>
          <RunDataItem>
            <RunDataLabel color="#A0A0A0">Distance (km)</RunDataLabel>
            <Controller
              control={control}
              name="distance"
              render={({ field: { onChange, value } }) => (
                <RunDataInput
                  backgroundColor={inputBackground}
                  textColor={textColor}
                  borderColor={errors.distance ? "#ff4444" : borderColor}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    handleDistanceChange(text);
                  }}
                  placeholder="5.0"
                  placeholderTextColor={`${textColor}80`}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.distance && (
              <ErrorText>{errors.distance.message}</ErrorText>
            )}
          </RunDataItem>

          <RunDataItem>
            <RunDataLabel color="#A0A0A0">Duration</RunDataLabel>
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <RunDataInput
                  backgroundColor={inputBackground}
                  textColor={textColor}
                  borderColor={errors.time ? "#ff4444" : borderColor}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    handleTimeChange(text);
                  }}
                  placeholder="25:30"
                  placeholderTextColor={`${textColor}80`}
                />
              )}
            />
            {errors.time && <ErrorText>{errors.time.message}</ErrorText>}
          </RunDataItem>

          <RunDataItem>
            <RunDataLabel color="#A0A0A0">Pace</RunDataLabel>
            <RunDataInput
              backgroundColor={inputBackground}
              textColor={textColor}
              borderColor={borderColor}
              value={pace}
              placeholder="5:06"
              placeholderTextColor={`${textColor}80`}
              keyboardType="numeric"
              editable={false}
            />
          </RunDataItem>
        </RunDataContainer>

        <SectionTitle color={textColor}>Location</SectionTitle>
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, value } }) => (
            <LocationInput
              backgroundColor={inputBackground}
              textColor={textColor}
              borderColor={errors.location ? "#ff4444" : borderColor}
              value={value}
              onChangeText={onChange}
              placeholder="한강공원, 올림픽공원 등"
              placeholderTextColor={`${textColor}80`}
            />
          )}
        />
        {errors.location && <ErrorText>{errors.location.message}</ErrorText>}

        <SectionTitle color={textColor}>Caption</SectionTitle>
        <Controller
          control={control}
          name="caption"
          render={({ field: { onChange, value } }) => (
            <CaptionInput
              backgroundColor={inputBackground}
              textColor={textColor}
              borderColor={borderColor}
              value={value || ""}
              onChangeText={onChange}
              placeholder="오늘 러닝은 어땠나요? 느낌을 공유해보세요."
              placeholderTextColor={`${textColor}80`}
              multiline
              scrollEnabled={true}
            />
          )}
        />
        <ToggleContainer
          backgroundColor={inputBackground}
          borderColor={borderColor}
        >
          <ToggleLabel color={textColor}>최고기록으로 기록하기</ToggleLabel>
          <ToggleButton
            isActive={isPersonalBest}
            onPress={() => setIsPersonalBest(!isPersonalBest)}
          >
            <ToggleThumb isActive={isPersonalBest} />
          </ToggleButton>
        </ToggleContainer>
      </Content>
    </Container>
  );
}
