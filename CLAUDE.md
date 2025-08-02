# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using Lerna for package management. Currently contains:
- `packages/client/` - Expo/React Native mobile app with TypeScript

The project uses Lerna with npm workspaces for dependency management across packages.

## Common Development Commands

### Root-level commands (from project root):
- `npm run start:client` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device  
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint on client code
- `npm run build` - Build all packages
- `npm run test` - Run tests across all packages

### Client-specific commands (from packages/client/):
- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Start web development server
- `npm run reset-project` - Reset to blank project template

## Architecture Notes

- Client is an Expo app using Expo Router for file-based routing with tab-based navigation
- TypeScript with strict mode enabled
- Uses React Native with Expo SDK ~53.0 and React 19.0.0
- Includes Kakao SDK integration for authentication (initialized in root layout)
- File-based routing with app directory structure using (tabs) grouped layout
- Component architecture with themed components (ThemedText, ThemedView) and styled-components via @emotion/native
- Custom hooks for color scheme and theme handling
- Uses SafeAreaView for proper screen boundaries on iOS
- Haptic feedback integration for tab interactions

## Key Dependencies

- Expo Router for navigation with tab-based layout
- React Native Reanimated for animations
- @emotion/native for styled-components
- Kakao SDK (@react-native-kakao/core, @react-native-kakao/user) for authentication
- Expo Image for optimized image handling
- React Native Safe Area Context for screen boundaries
- React Native Gesture Handler for touch interactions
- Expo modules for native functionality (blur, haptics, symbols, etc.)

## Development Notes

- The app directory contains the main application code with file-based routing
- Main navigation uses (tabs) grouped layout with three tabs: index (home), explore, and profile
- Root layout (_layout.tsx) initializes Kakao SDK and sets up dark theme by default
- Components are organized in the components/ directory with a ui/ subdirectory for reusable UI components
- FeedView component system with modular sub-components (ActionView, ContentView, ProfileView, RecordView)
- Hooks are in the hooks/ directory for reusable logic (color scheme, theme handling)
- Constants like Colors are in the constants/ directory with dark theme configurations
- Uses path alias `@/*` pointing to the current directory
- IconSymbol component uses platform-specific implementations (.ios.tsx files for iOS-specific code)
- Tab bar uses custom styling with blur effects on iOS and haptic feedback

## Styling Guidelines

### CSS-in-JS with @emotion/native
- **ALWAYS use @emotion/native for styling new components** instead of StyleSheet.create()
- Use styled-components syntax with template literals for better readability and maintainability
- Define styled components at the top level of the file, outside of the main component function
- Use TypeScript interfaces for styled component props to ensure type safety

### Styling Conventions
- **Component naming**: Use PascalCase with "Styled" prefix for styled components (e.g., `StyledContainer`, `StyledHeader`)
- **Props interfaces**: Create separate interfaces for styled component props with descriptive names (e.g., `StyledContainerProps`)
- **Theme integration**: Always use `useThemeColor` hook for dynamic theming instead of hardcoded colors
- **Responsive units**: Use `px` suffix for pixel values in styled-components template literals
- **Layout properties**: Prefer CSS property names over React Native camelCase (e.g., `flex-direction` over `flexDirection`)

### Example Pattern:
```typescript
import styled from '@emotion/native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface StyledContainerProps {
  backgroundColor: string;
}

const StyledContainer = styled.View<StyledContainerProps>`
  background-color: ${props => props.backgroundColor};
  padding: 16px;
  border-radius: 8px;
`;

export function MyComponent() {
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <StyledContainer backgroundColor={backgroundColor}>
      {/* content */}
    </StyledContainer>
  );
}
```

### Migration Priority
- When updating existing components, migrate from StyleSheet to @emotion/native
- Maintain existing component APIs and functionality during migration
- Ensure theme compatibility is preserved