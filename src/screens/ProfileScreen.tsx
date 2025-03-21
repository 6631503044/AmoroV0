"use client"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from "react-native"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"

const LANGUAGES = [
  { id: "en", name: "English" },
  { id: "th", name: "Thai" },
  { id: "es", name: "Spanish" },
  { id: "fr", name: "French" },
]

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { theme, toggleTheme } = useTheme()
  const { user, signOut } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showLanguages, setShowLanguages] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const navigateToPartnerSettings = () => {
    navigation.navigate("PartnerSettings" as never)
  }

  const navigateToAccountSettings = () => {
    navigation.navigate("AccountSettings" as never)
  }

  const navigateToPermissions = () => {
    navigation.navigate("Permissions" as never)
  }

  const navigateToChangePassword = () => {
    navigation.navigate("ChangePassword" as never)
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: user?.photoURL || "/placeholder.svg?height=150&width=150" }}
            style={styles.profileImage}
          />
          <Text style={[styles.username, { color: theme.colors.text }]}>{user?.displayName || "User"}</Text>
          <Text style={[styles.email, { color: theme.colors.secondaryText }]}>{user?.email || "user@example.com"}</Text>
        </View>

        {user?.partnerId && (
          <TouchableOpacity
            style={[styles.partnerSection, { backgroundColor: theme.colors.card }]}
            onPress={navigateToPartnerSettings}
          >
            <View style={styles.partnerInfo}>
              <Image source={{ uri: "/placeholder.svg?height=150&width=150" }} style={styles.partnerImage} />
              <View>
                <Text style={[styles.partnerLabel, { color: theme.colors.secondaryText }]}>Your Partner</Text>
                <Text style={[styles.partnerName, { color: theme.colors.text }]}>Jane Doe</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        )}

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account</Text>

          <TouchableOpacity
            style={[styles.settingsItem, { backgroundColor: theme.colors.card }]}
            onPress={navigateToAccountSettings}
          >
            <View style={styles.settingsItemLeft}>
              <Ionicons name="person-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingsItem, { backgroundColor: theme.colors.card }]}
            onPress={navigateToChangePassword}
          >
            <View style={styles.settingsItemLeft}>
              <Ionicons name="lock-closed-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.secondaryText} />
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>Settings</Text>

          <View style={[styles.settingsItem, { backgroundColor: theme.colors.card }]}>
            <View style={styles.settingsItemLeft}>
              <Ionicons
                name={theme.mode === "dark" ? "sunny-outline" : "moon-outline"}
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={theme.mode === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: `${theme.colors.primary}80` }}
              thumbColor={theme.mode === "dark" ? theme.colors.primary : "#f4f3f4"}
            />
          </View>

          <View style={[styles.settingsItem, { backgroundColor: theme.colors.card }]}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="notifications-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: `${theme.colors.primary}80` }}
              thumbColor={notificationsEnabled ? theme.colors.primary : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity
            style={[styles.settingsItem, { backgroundColor: theme.colors.card }]}
            onPress={() => setShowLanguages(!showLanguages)}
          >
            <View style={styles.settingsItemLeft}>
              <Ionicons name="language-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>Language</Text>
            </View>
            <View style={styles.languageSelector}>
              <Text style={[styles.languageText, { color: theme.colors.secondaryText }]}>
                {LANGUAGES.find((lang) => lang.id === selectedLanguage)?.name}
              </Text>
              <Ionicons
                name={showLanguages ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.colors.secondaryText}
              />
            </View>
          </TouchableOpacity>

          {showLanguages && (
            <View style={[styles.languageOptions, { backgroundColor: theme.colors.card }]}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  style={[
                    styles.languageOption,
                    selectedLanguage === lang.id && {
                      backgroundColor: `${theme.colors.primary}20`,
                    },
                  ]}
                  onPress={() => {
                    setSelectedLanguage(lang.id)
                    setShowLanguages(false)
                  }}
                >
                  <Text
                    style={[
                      styles.languageOptionText,
                      { color: theme.colors.text },
                      selectedLanguage === lang.id && {
                        color: theme.colors.primary,
                        fontFamily: "Poppins-SemiBold",
                      },
                    ]}
                  >
                    {lang.name}
                  </Text>
                  {selectedLanguage === lang.id && <Ionicons name="checkmark" size={20} color={theme.colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[styles.settingsItem, { backgroundColor: theme.colors.card }]}
            onPress={navigateToPermissions}
          >
            <View style={styles.settingsItemLeft}>
              <Ionicons name="options-outline" size={24} color={theme.colors.primary} />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>Permissions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.colors.card }]}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={24} color="red" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  partnerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  partnerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  partnerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  partnerLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  partnerName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  settingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 15,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginLeft: 15,
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginRight: 5,
  },
  languageOptions: {
    borderRadius: 8,
    marginBottom: 15,
    marginTop: -5,
    marginLeft: 20,
    marginRight: 20,
    overflow: "hidden",
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  languageOptionText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "red",
    marginLeft: 10,
  },
})

export default ProfileScreen

