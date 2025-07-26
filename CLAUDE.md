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

- Client is an Expo app using Expo Router for file-based routing
- TypeScript with strict mode enabled
- Uses React Native with Expo SDK ~53.0
- Includes Kakao SDK integration for authentication
- File-based routing with app directory structure
- Component architecture with themed components (ThemedText, ThemedView)
- Custom hooks for color scheme and theme handling

## Key Dependencies

- Expo Router for navigation
- React Native Reanimated for animations
- Kakao SDK for authentication
- Expo modules for native functionality

## Development Notes

- The app directory contains the main application code with file-based routing
- Components are organized in the components/ directory with a ui/ subdirectory
- Hooks are in the hooks/ directory for reusable logic
- Constants like Colors are in the constants/ directory
- Uses path alias `@/*` pointing to the current directory