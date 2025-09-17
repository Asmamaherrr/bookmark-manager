"use client"

import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import NotesGrid from "./components/NotesGrid"
import CreateNoteForm from "./components/CreateNoteForm"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignupForm"
import SearchBar from "./components/SearchBar"
import { useNotes } from "./hooks/useNotes"
import "./App.css"
import MindMap from "./components/mindMapping"



function App() {
  const [currentView, setCurrentView] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingNote, setEditingNote] = useState(null)
  const [theme, setTheme] = useState("light") // Default to light theme
  
  const { notes, addNote, toggleFavorite, updateNote, deleteNote } = useNotes()

  const [showMindMap, setShowMindMap] = useState(false)
const [mindMapData, setMindMapData] = useState(null)
  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        setTheme("dark")
        document.documentElement.setAttribute("data-theme", "dark")
      }
    }
  }, [])

  // Update theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const handleCreateNote = (noteData) => {
    addNote(noteData)
    setShowCreateForm(false)
  }

  const handleEditNote = (noteData) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData)
      setEditingNote(null)
    }
  }
const handleSaveMindMap = (mindMapData) => {
  const content = `# Mind Map\n\n${JSON.stringify(mindMapData, null, 2)}`
  addNote({
    title: `Mind Map ${new Date().toLocaleDateString()}`,
    content,
    tags: ["mindmap", "visualization"]
  })
  setShowMindMap(false)
}

  const getFilteredNotes = () => {
    let filtered = notes

    // Filter by view
    switch (currentView) {
      case "favorites":
        filtered = notes.filter((note) => note.isFavorite)
        break
      case "deleted":
        filtered = notes.filter((note) => note.isDeleted)
        break
      default:
        filtered = notes.filter((note) => !note.isDeleted)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return filtered
  }

  return (
    <div className="app-container" data-theme={theme}>
      <div className="flex h-screen bg-background text-foreground font-body transition-colors duration-300">
        <Sidebar
  currentView={currentView}
  onViewChange={setCurrentView}
  onCreateNote={() => setShowCreateForm(true)}
  onLogin={() => setShowLoginForm(true)}
  onSignup={() => setShowSignupForm(true)}
  theme={theme}
  toggleTheme={toggleTheme}
  onShowMindMap={() => setShowMindMap(true)} // Add this line
/>
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-heading font-semibold text-elegant capitalize tracking-tight">
                {currentView === "all" ? "All Notes" : currentView}
              </h1>
            </div>

            {(currentView === "all" || currentView === "favorites" || currentView === "deleted") && (
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder={`Search ${currentView}...`}
              />
            )}
          </div>

          <div className="flex-1 overflow-auto">
            <NotesGrid
              notes={getFilteredNotes()}
              onToggleFavorite={toggleFavorite}
              onEdit={setEditingNote}
              onDelete={deleteNote}
              searchQuery={searchQuery}
              currentView={currentView}
            />
          </div>
        </main>

        {showCreateForm && (
          <CreateNoteForm 
            onSubmit={handleCreateNote} 
            onClose={() => setShowCreateForm(false)} 
          />
        )}

        {editingNote && (
          <CreateNoteForm 
            note={editingNote}
            onSubmit={handleEditNote} 
            onClose={() => setEditingNote(null)} 
          />
        )}
{showMindMap && (
  <MindMap 
    onClose={() => setShowMindMap(false)} 
    onSave={handleSaveMindMap}
    initialData={mindMapData}
  />
)}
        {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}

        {showSignupForm && <SignupForm onClose={() => setShowSignupForm(false)} />}
      </div>
    </div>
  )
}

export default App