"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

// Mock activity data
const ACTIVITY = {
  id: "1",
  title: "Dinner at Italian Restaurant",
  date: "2023-06-10",
  type: "couple",
  tag: "date",
  emoji: "🍝",
}

// Mood options
const MOODS = [
  { id: "1", name: "Happy", emoji: "😊" },
  { id: "2", name: "Relaxed", emoji: "😌" },
  { id: "3", name: "Excited", emoji: "🤩" },
  { id: "4", name: "Romantic", emoji: "❤️" },
  { id: "5", name: "Tired", emoji: "😴" },
  { id: "6", name: "Bored", emoji: "😒" },
]

const AddReviewScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { theme } = useTheme()

  // In a real app, you would fetch the activity based on the ID from the route
  // const { activityId } = route.params;
  const activity = ACTIVITY

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const handleSave = () => {
    // Here you would save the review to your data store
    console.log({
      activityId: activity.id,
      rating,
      review,
      mood: selectedMood,
    })

    navigation.goBack()
  }

  const renderRatingSelector = () => {
    return (
      <View style={styles.ratingSelector}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? "heart" : "heart-outline"}
              size={40}
              color={theme.colors.primary}
              style={styles.ratingStar}
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Add Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.activityCard, { backgroundColor: theme.colors.card }]}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{activity.emoji}</Text>
          </View>
          <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{activity.title}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>How was your mood?</Text>

        <View style={styles.moodSelector}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodItem,
                selectedMood === mood.id && {
                  backgroundColor: `${theme.colors.primary}20`,
                  borderColor: theme.colors.primary,
                },
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.moodName,
                  { color: theme.colors.text },
                  selectedMood === mood.id && { color: theme.colors.primary },
                ]}
              >
                {mood.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>How was your experience?</Text>

        {renderRatingSelector()}

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Add a note (optional)</Text>

        <TextInput
          style={[
            styles.reviewInput,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderColor: theme.colors.border,
            },
          ]}
          value={review}
          onChangeText={setReview}
          placeholder="Share your thoughts about this activity..."
          placeholderTextColor={theme.colors.secondaryText}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.saveButtonLarge, { backgroundColor: theme.colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Review</Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  activityCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  emojiContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  emoji: {
    fontSize: 36,
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 15,
  },
  moodSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  moodItem: {
    width: "30%",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    marginBottom: 10,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  moodName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  ratingSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  ratingStar: {
    marginHorizontal: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    marginBottom: 30,
    minHeight: 150,
  },
  saveButtonLarge: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
})

export default AddReviewScreen

