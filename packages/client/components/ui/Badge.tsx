import { useThemeColor } from "@/hooks/useThemeColor";
import styled from "@emotion/native";
import React from "react";

interface BadgeProps {
  visible?: boolean;
  text?: string;
  size?: number;
}

interface StyledBadgeProps {
  backgroundColor: string;
  size: number;
}

const StyledBadge = styled.View<StyledBadgeProps>`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: ${(props) => props.backgroundColor};
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 2px;
  z-index: 1;
`;

const StyledBadgeText = styled.Text`
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
`;

export function Badge({ visible = false, text = "N", size = 12 }: BadgeProps) {
  const backgroundColor = useThemeColor({}, "tint");

  if (!visible) return null;

  return (
    <StyledBadge backgroundColor={backgroundColor} size={size}>
      <StyledBadgeText>{text}</StyledBadgeText>
    </StyledBadge>
  );
}
