"use client"
import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { format } from "date-fns"

// Mock data for past activities
const PAST_ACTIVITIES = [
  {
    id: "1",
    title: "Dinner at Italian Restaurant",
    date: "2023-06-10",
    type: "couple",
    tag: "date",
    emoji: "🍝",
    reviewed: true,
    rating: 5,
  },
  {
    id: "2",
    title: "Movie Night",
    date: "2023-06-08",
    type: "couple",
    tag: "entertainment",
    emoji: "🎬",
    reviewed: true,
    rating: 4,
  },
  {
    id: "3",
    title: "Beach Day",
    date: "2023-06-05",
    type: "couple",
    tag: "travel",
    emoji: "🏖️",
    reviewed: false,
  },
  {
    id: "4",
    title: "Hiking Trip",
    date: "2023-06-01",
    type: "couple",
    tag: "exercise",
    emoji: "🥾",
    reviewed: true,
    rating: 5,
  },
  {
    id: "5",
    title: "Cooking Together",
    date: "2023-05-28",
    type: "couple",
    tag: "food",
    emoji: "👨‍🍳",
    reviewed: true,
    rating: 3,
  },
]

type FilterType = "day" | "week" | "month"

const MoodsScreen = () => {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const [filter, setFilter] = useState<FilterType>("day")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredActivities = PAST_ACTIVITIES.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "heart" : "heart-outline"}
            size={16}
            color={theme.colors.primary}
          />
        ))}
      </View>
    )
  }

  const renderActivityItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.activityItem, { backgroundColor: theme.colors.card }]}
        onPress={() => navigation.navigate("ActivityReview" as never, { activityId: item.id } as never)}
      >
        <View style={styles.activityHeader}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          <View style={styles.activityDetails}>
            <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.activityDate, { color: theme.colors.secondaryText }]}>
              {format(new Date(item.date), "MMMM d, yyyy")}
            </Text>
          </View>
        </View>

        <View style={styles.activityFooter}>
          {item.reviewed ? (
            renderRatingStars(item.rating)
          ) : (
            <TouchableOpacity
              style={[styles.reviewButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate("AddReview" as never, { activityId: item.id } as never)}
            >
              <Text style={styles.reviewButtonText}>Add Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Moods</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.secondaryText} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search activities..."
          placeholderTextColor={theme.colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Review and rate your past activities</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "day" && { backgroundColor: theme.colors.primary }]}
          onPress={() => setFilter("day")}
        >
          <Text style={[styles.filterButtonText, { color: filter === "day" ? "#FFFFFF" : theme.colors.text }]}>
            Day
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "week" && { backgroundColor: theme.colors.primary }]}
          onPress={() => setFilter("week")}
        >
          <Text style={[styles.filterButtonText, { color: filter === "week" ? "#FFFFFF" : theme.colors.text }]}>
            Week
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === "month" && { backgroundColor: theme.colors.primary }]}
          onPress={() => setFilter("month")}
        >
          <Text style={[styles.filterButtonText, { color: filter === "month" ? "#FFFFFF" : theme.colors.text }]}>
            Month
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  activityItem: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  emojiContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  emoji: {
    fontSize: 24,
  },
  activityDetails: {
    flex: 1,
    justifyContent: "center",
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  activityFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  reviewButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reviewButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
})

export default MoodsScreen


