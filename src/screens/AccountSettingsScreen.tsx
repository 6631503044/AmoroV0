"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import Input from "../components/Input"
import Button from "../components/Button"

const AccountSettingsScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user } = useAuth()

  const [name, setName] = useState(user?.displayName || "")
  const [username, setUsername] = useState("@johndoe")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("+1 234 567 8900")
  const [birthday, setBirthday] = useState("1990-01-01")
  const [hobbies, setHobbies] = useState("Reading, Hiking, Photography")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigation.goBack()
    }, 1000)
  }

  const handleChangeProfilePicture = () => {
    // Handle profile picture change
    console.log("Change profile picture")
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Account Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profilePictureSection}>
          <Image
            source={{ uri: user?.photoURL || "/placeholder.svg?height=150&width=150" }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={[styles.changePhotoButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleChangeProfilePicture}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.secondaryText} />}
          />

          <Input
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            leftIcon={<Ionicons name="at-outline" size={20} color={theme.colors.secondaryText} />}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.secondaryText} />}
            editable={false}
            style={{ opacity: 0.7 }}
          />

          <Input
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.secondaryText} />}
          />

          <Input
            label="Birthday"
            value={birthday}
            onChangeText={setBirthday}
            placeholder="YYYY-MM-DD"
            leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.secondaryText} />}
          />

          <Input
            label="Hobbies"
            value={hobbies}
            onChangeText={setHobbies}
            placeholder="Enter your hobbies"
            leftIcon={<Ionicons name="heart-outline" size={20} color={theme.colors.secondaryText} />}
            multiline
            numberOfLines={3}
          />

          <Button
            title={loading ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            disabled={loading}
            style={{ marginTop: 20 }}
          />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profilePictureSection: {
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  formSection: {
    marginBottom: 20,
  },
})

export default AccountSettingsScreen

