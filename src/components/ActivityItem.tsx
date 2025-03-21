"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface Activity {
  id: string
  title: string
  startTime: string
  endTime: string
  date: string
  type: "personal" | "couple"
  tag: string
  emoji: string
}

interface ActivityItemProps {
  activity: Activity
  onPress: () => void
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onPress }) => {
  const { theme } = useTheme()

  const activityColor = activity.type === "personal" ? theme.colors.personalActivity : theme.colors.coupleActivity

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          borderLeftColor: activityColor,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.timeContainer}>
        <Text style={[styles.time, { color: theme.colors.secondaryText }]}>{activity.startTime}</Text>
        <Text style={[styles.timeSeparator, { color: theme.colors.secondaryText }]}>-</Text>
        <Text style={[styles.time, { color: theme.colors.secondaryText }]}>{activity.endTime}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{activity.title}</Text>
        <Text style={[styles.tag, { color: theme.colors.secondaryText }]}>{activity.tag}</Text>
      </View>

      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{activity.emoji}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timeContainer: {
    width: 80,
  },
  time: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  timeSeparator: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 2,
  },
  tag: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  emoji: {
    fontSize: 20,
  },
})

export default ActivityItem

