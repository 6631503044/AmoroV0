"use client"

import type React from "react"
import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface Tag {
  id: string
  name: string
  emoji: string
}

interface TagSelectorProps {
  tags: Tag[]
  selectedTagId: string | null
  onSelectTag: (tagId: string) => void
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, selectedTagId, onSelectTag }) => {
  const { theme } = useTheme()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {tags.map((tag) => (
        <TouchableOpacity
          key={tag.id}
          style={[
            styles.tagItem,
            {
              backgroundColor: selectedTagId === tag.id ? `${theme.colors.primary}20` : theme.colors.card,
              borderColor: selectedTagId === tag.id ? theme.colors.primary : theme.colors.border,
            },
          ]}
          onPress={() => onSelectTag(tag.id)}
        >
          <Text style={styles.emoji}>{tag.emoji}</Text>
          <Text
            style={[
              styles.tagName,
              {
                color: selectedTagId === tag.id ? theme.colors.primary : theme.colors.text,
              },
            ]}
          >
            {tag.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 15,
  },
  tagItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    minWidth: 80,
  },
  emoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  tagName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
})

export default TagSelector

