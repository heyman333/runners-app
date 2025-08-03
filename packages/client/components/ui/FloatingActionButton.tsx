import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

interface StyledFABProps {
  backgroundColor: string;
}

const FABContainer = styled.View`
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 50;
`;

const StyledFAB = styled(Animated.View)<StyledFABProps>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) => props.backgroundColor};
  justify-content: center;
  align-items: center;
  elevation: 8;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

const TouchableArea = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
`;

const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const backgroundColor = useThemeColor({}, "tint");

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { duration: 100 }),
      withSpring(1, { duration: 200 })
    );

    onPress();
  };

  return (
    <FABContainer>
      <StyledFAB backgroundColor={backgroundColor} style={animatedStyle}>
        <TouchableArea onPress={handlePress} activeOpacity={0.8}>
          <IconContainer>
            <Ionicons name="add" size={28} color="#fff" />
          </IconContainer>
        </TouchableArea>
      </StyledFAB>
    </FABContainer>
  );
}
