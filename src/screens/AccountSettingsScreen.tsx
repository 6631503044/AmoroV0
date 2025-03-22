"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import Input from "../components/Input"
import Button from "../components/Button"

const AccountSettingsScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user?.displayName || "")
  const [username, setUsername] = useState(user?.username || "@johndoe")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "+1 234 567 8900")
  const [birthday, setBirthday] = useState(user?.birthday || "1990-01-01")
  const [hobbies, setHobbies] = useState(user?.hobbies || "Reading, Hiking, Photography")
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.photoURL || "/placeholder.svg?height=150&width=150")
  const [showImagePicker, setShowImagePicker] = useState(false)

  // Mock images for demo
  const mockImages = [
    "/placeholder.svg?height=150&width=150&text=Photo1",
    "/placeholder.svg?height=150&width=150&text=Photo2",
    "/placeholder.svg?height=150&width=150&text=Photo3",
    "/placeholder.svg?height=150&width=150&text=Photo4",
    "/placeholder.svg?height=150&width=150&text=Photo5",
    "/placeholder.svg?height=150&width=150&text=Photo6",
  ]

  const handleSave = async () => {
    setLoading(true)
    try {
      // In a real app, you would update the user profile in your backend
      // Here we're just simulating the API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the user profile in the context
      if (updateProfile) {
        await updateProfile({
          displayName: name,
          username,
          phone,
          birthday,
          hobbies,
          photoURL: profileImage,
        })
      }

      Alert.alert("Success", "Profile updated successfully")
      navigation.goBack()
    } catch (error) {
      Alert.alert("Error", "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleChangeProfilePicture = () => {
    setShowImagePicker(true)
  }

  const selectImage = (imageUri) => {
    setProfileImage(imageUri)
    setShowImagePicker(false)
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
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
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

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Choose Profile Picture</Text>
              <TouchableOpacity onPress={() => setShowImagePicker(false)}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.imageGrid}>
              {mockImages.map((image, index) => (
                <TouchableOpacity key={index} style={styles.imageItem} onPress={() => selectImage(image)}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.cameraOption, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                // In a real app, this would open the camera
                Alert.alert("Camera", "This would open the camera in a real app")
                setShowImagePicker(false)
              }}
            >
              <Ionicons name="camera" size={24} color="#FFFFFF" style={styles.cameraIcon} />
              <Text style={styles.cameraText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  imageItem: {
    width: "30%",
    marginBottom: 15,
  },
  galleryImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  cameraOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cameraIcon: {
    marginRight: 10,
  },
  cameraText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
})

export default AccountSettingsScreen

