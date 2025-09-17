"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import NotesGrid from "./components/NotesGrid"
import CreateNoteForm from "./components/CreateNoteForm"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignupForm"
import SearchBar from "./components/SearchBar"
import { useNotes } from "./hooks/useNotes"
import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { notes, addNote, toggleFavorite } = useNotes()

  const handleCreateNote = (noteData) => {
    addNote(noteData)
    setShowCreateForm(false)
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
    <div className="flex h-screen bg-white text-black font-body">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onCreateNote={() => setShowCreateForm(true)}
        onLogin={() => setShowLoginForm(true)}
        onSignup={() => setShowSignupForm(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200">
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
            searchQuery={searchQuery}
            currentView={currentView}
          />
        </div>
      </main>

      {showCreateForm && <CreateNoteForm onSubmit={handleCreateNote} onClose={() => setShowCreateForm(false)} />}

      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}

      {showSignupForm && <SignupForm onClose={() => setShowSignupForm(false)} />}
    </div>
  )
}

export default App
