"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  Modal,
  TextInput,
  FlatList,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import Input from "../components/Input"
import Button from "../components/Button"

// Sample avatar images that can be used without external dependencies
const sampleAvatars = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
]

const AccountSettingsScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user, updateUserProfile } = useAuth()

  const [name, setName] = useState(user?.displayName || "")
  const [username, setUsername] = useState("@johndoe")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("+1 234 567 8900")
  const [birthday, setBirthday] = useState("1990-01-01")
  const [hobbies, setHobbies] = useState("Reading, Hiking, Photography")
  const [loading, setLoading] = useState(false)
  const [showDateModal, setShowDateModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.photoURL || "https://randomuser.me/api/portraits/men/1.jpg")
  const [customImageUrl, setCustomImageUrl] = useState("")

  // Date picker state
  const [selectedYear, setSelectedYear] = useState(1990)
  const [selectedMonth, setSelectedMonth] = useState(1)
  const [selectedDay, setSelectedDay] = useState(1)

  // Initialize date picker values from birthday
  useEffect(() => {
    if (birthday) {
      const [year, month, day] = birthday.split("-").map((num) => Number.parseInt(num, 10))
      setSelectedYear(year)
      setSelectedMonth(month)
      setSelectedDay(day)
    }
  }, [birthday])

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your full name")
      return
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address")
      return
    }

    setLoading(true)
    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user profile in auth context
      if (updateUserProfile) {
        await updateUserProfile({
          displayName: name,
          email: email,
          photoURL: profileImage,
          // Add other fields as needed
        })
      }

      Alert.alert("Success", "Your profile has been updated successfully")
      navigation.goBack()
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.")
      console.error("Profile update error:", error)
    } finally {
      setLoading(false)
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChangeProfilePicture = () => {
    setShowImageModal(true)
  }

  const selectAvatar = (avatarUrl) => {
    setProfileImage(avatarUrl)
    setShowImageModal(false)
  }

  const handleCustomImageSubmit = () => {
    if (customImageUrl.trim()) {
      setProfileImage(customImageUrl)
      setCustomImageUrl("")
      setShowImageModal(false)
    } else {
      Alert.alert("Error", "Please enter a valid image URL")
    }
  }

  const showDatePicker = () => {
    setShowDateModal(true)
  }

  const hideDatePicker = () => {
    setShowDateModal(false)
  }

  const confirmDate = () => {
    const formattedMonth = selectedMonth.toString().padStart(2, "0")
    const formattedDay = selectedDay.toString().padStart(2, "0")
    setBirthday(`${selectedYear}-${formattedMonth}-${formattedDay}`)
    hideDatePicker()
  }

  // Generate arrays for years, months, and days
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Custom picker wheel component
  const PickerWheel = ({ data, selectedValue, onValueChange, label }) => {
    return (
      <View style={styles.pickerWheelContainer}>
        <Text style={styles.pickerLabel}>{label}</Text>
        <ScrollView
          style={styles.pickerWheel}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 80 }}
        >
          {data.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.pickerItem, selectedValue === item && styles.selectedPickerItem]}
              onPress={() => onValueChange(item)}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  selectedValue === item && styles.selectedPickerItemText,
                  { color: theme.colors.text },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
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
          />

          <Input
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.secondaryText} />}
          />

          <TouchableOpacity onPress={showDatePicker}>
            <Input
              label="Birthday"
              value={birthday}
              placeholder="YYYY-MM-DD"
              leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.secondaryText} />}
              editable={false}
              rightIcon={<Ionicons name="chevron-down" size={20} color={theme.colors.secondaryText} />}
            />
          </TouchableOpacity>

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

      {/* Custom Date Picker Modal */}
      <Modal visible={showDateModal} transparent={true} animationType="slide" onRequestClose={hideDatePicker}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Select Birthday</Text>

            <View style={styles.datePickerContainer}>
              <PickerWheel data={years} selectedValue={selectedYear} onValueChange={setSelectedYear} label="Year" />
              <PickerWheel data={months} selectedValue={selectedMonth} onValueChange={setSelectedMonth} label="Month" />
              <PickerWheel data={days} selectedValue={selectedDay} onValueChange={setSelectedDay} label="Day" />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={hideDatePicker}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton, { backgroundColor: theme.colors.primary }]}
                onPress={confirmDate}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal */}
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Choose Profile Picture</Text>

            <FlatList
              data={sampleAvatars}
              numColumns={4}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.avatarItem} onPress={() => selectAvatar(item)}>
                  <Image source={{ uri: item }} style={styles.avatarImage} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.avatarGrid}
            />

            <View style={styles.customUrlContainer}>
              <Text style={[styles.customUrlLabel, { color: theme.colors.text }]}>Or enter image URL:</Text>
              <View style={styles.customUrlInputContainer}>
                <TextInput
                  style={[styles.customUrlInput, { color: theme.colors.text, borderColor: theme.colors.border }]}
                  value={customImageUrl}
                  onChangeText={setCustomImageUrl}
                  placeholder="https://example.com/image.jpg"
                  placeholderTextColor={theme.colors.secondaryText}
                />
                <TouchableOpacity
                  style={[styles.customUrlButton, { backgroundColor: theme.colors.primary }]}
                  onPress={handleCustomImageSubmit}
                >
                  <Text style={styles.customUrlButtonText}>Use</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton, { marginTop: 10 }]}
              onPress={() => setShowImageModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pickerWheelContainer: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500",
  },
  pickerWheel: {
    height: 160,
    width: "100%",
  },
  pickerItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedPickerItem: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
  },
  pickerItemText: {
    fontSize: 16,
  },
  selectedPickerItemText: {
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  // Avatar picker styles
  avatarGrid: {
    paddingVertical: 10,
  },
  avatarItem: {
    margin: 5,
    borderRadius: 40,
    overflow: "hidden",
  },
  avatarImage: {
    width: 70,
    height: 70,
  },
  customUrlContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  customUrlLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  customUrlInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  customUrlInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  customUrlButton: {
    height: 45,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  customUrlButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})

export default AccountSettingsScreen

