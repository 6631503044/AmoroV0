"use client"

import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "./src/context/ThemeContext"
import AuthProvider from "./src/context/AuthContext"
import RootNavigator from "./src/navigation/RootNavigator"
import { LogBox } from "react-native"

// Ignore specific warnings
LogBox.ignoreLogs([
  "shadow*",
  "props.pointerEvents is deprecated",
  "Image: style.tintColor is deprecated",
  "Unexpected text node",
  "The action 'NAVIGATE'",
  "Encountered two children with the same key",
])

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

