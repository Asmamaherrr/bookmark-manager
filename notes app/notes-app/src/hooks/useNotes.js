"use client"

import { useState, useEffect } from "react"

export const useNotes = () => {
  const [notes, setNotes] = useState([])

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes && JSON.parse(savedNotes).length > 0) {
      setNotes(JSON.parse(savedNotes))
    } else {
      const sampleNotes = [
        {
          id: "1",
          title: "School Requirements",
          content: "school ID and 2 photos, last year’s report card, notebooks, pens, pencils, colors, and ruler",
          tags: ["welcome", "getting-started"],
          isFavorite: true,
          isDeleted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Meeting Notes",
          content: "Discussed project timeline and deliverables. Next meeting scheduled for Friday.",
          tags: ["work", "meetings"],
          isFavorite: false,
          isDeleted: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          title: "Shopping List",
          content: "Milk, Bread, Eggs, Apples, Chicken, Rice, Olive Oil, Tomatoes",
          tags: ["personal", "shopping"],
          isFavorite: true,
          isDeleted: false,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: "4",
          title: "Book Ideas",
          content: "1. The Art of Minimalism\n2. Digital Detox Guide\n3. Productivity Hacks for Developers",
          tags: ["ideas", "books", "writing"],
          isFavorite: false,
          isDeleted: false,
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          updatedAt: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          id: "5",
          title: "Travel Plans",
          content:
            "Summer vacation to Japan:\n- Visit Tokyo and Kyoto\n- Try authentic ramen\n- Visit temples and gardens",
          tags: ["travel", "vacation", "japan"],
          isFavorite: true,
          isDeleted: false,
          createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
          updatedAt: new Date(Date.now() - 604800000).toISOString(),
        },
        {
          id: "6",
          title: "Recipe: Pasta Carbonara",
          content:
            "Ingredients: Pasta, Eggs, Parmesan, Pancetta, Black Pepper\nCook pasta, mix with egg mixture, add pancetta and cheese.",
          tags: ["recipe", "cooking", "italian"],
          isFavorite: false,
          isDeleted: false,
          createdAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
          updatedAt: new Date(Date.now() - 1209600000).toISOString(),
        },
      ]
      setNotes(sampleNotes)
      localStorage.setItem("notes", JSON.stringify(sampleNotes))
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      ...noteData,
      isFavorite: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setNotes((prev) => [newNote, ...prev])
  }

  const toggleFavorite = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isFavorite: !note.isFavorite, updatedAt: new Date().toISOString() } : note,
      ),
    )
  }

  const deleteNote = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isDeleted: true, updatedAt: new Date().toISOString() } : note,
      ),
    )
  }

  const restoreNote = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isDeleted: false, updatedAt: new Date().toISOString() } : note,
      ),
    )
  }

  const updateNote = (noteId, updates) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note)),
    )
  }

  return {
    notes,
    addNote,
    toggleFavorite,
    deleteNote,
    restoreNote,
    updateNote,
  }
}
