"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NotesGrid from "./components/NotesGrid";
import CreateNoteForm from "./components/CreateNoteForm";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import SearchBar from "./components/SearchBar";
import { useNotes } from "./hooks/useNotes";
import "./App.css";
import MindMap from "./components/mindMapping";
import PomodoroTimer from "./components/PomodoroTimer";
import DailyPromptModal from "./components/DailyPromptModal";
import { getDailyPrompt } from "./dailyPromptsData";

function App() {
  const [currentView, setCurrentView] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [theme, setTheme] = useState("light");
  const [activeSmartCollection, setActiveSmartCollection] = useState(null);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showDailyPrompt, setShowDailyPrompt] = useState(false);
  const [dailyPrompt, setDailyPrompt] = useState("");

  const { notes, addNote, toggleFavorite, updateNote, deleteNote } = useNotes();

  const [showMindMap, setShowMindMap] = useState(false);
  const [mindMapData, setMindMapData] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        setTheme("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }

    setDailyPrompt(getDailyPrompt());
  }, []);

  const smartCollections = [
    {
      id: "last-week",
      label: "Last Week's Notes",
      rule: (note) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(note.createdAt) >= oneWeekAgo;
      },
    },
    {
      id: "work-notes",
      label: "Work Notes",
      rule: (note) => note.tags.includes("work"),
    },
    {
      id: "untagged",
      label: "Untagged Notes",
      rule: (note) => note.tags.length === 0,
    },
  ];

  const handleViewChange = (viewId) => {
    setCurrentView(viewId);
    setActiveSmartCollection(null);
  };

  const handleSmartCollectionChange = (collectionId) => {
    setCurrentView("smart-collection");
    setActiveSmartCollection(collectionId);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleCreateNote = (noteData) => {
    addNote(noteData);
    setShowCreateForm(false);
  };

  const handleEditNote = (noteData) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setEditingNote(null);
    }
  };

  const handleSaveMindMap = (mindMapData) => {
    const content = `# Mind Map\n\n${JSON.stringify(mindMapData, null, 2)}`;
    addNote({
      title: `Mind Map ${new Date().toLocaleDateString()}`,
      content,
      tags: ["mindmap", "visualization"],
    });
    setShowMindMap(false);
  };

  const getFilteredNotes = () => {
    let filtered = notes;

    if (activeSmartCollection) {
      const collection = smartCollections.find((c) => c.id === activeSmartCollection);
      if (collection) {
        filtered = filtered.filter(collection.rule);
      }
    } else {
      switch (currentView) {
        case "favorites":
          filtered = notes.filter((note) => note.isFavorite);
          break;
        case "deleted":
          filtered = notes.filter((note) => note.isDeleted);
          break;
        default:
          filtered = notes.filter((note) => !note.isDeleted);
      }
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  return (
    <div className="app-container h-screen" data-theme={theme}>
      <div className="flex h-screen bg-background text-foreground font-body transition-colors duration-300">
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          onCreateNote={() => setShowCreateForm(true)}
          onLogin={() => setShowLoginForm(true)}
          onSignup={() => setShowSignupForm(true)}
          theme={theme}
          toggleTheme={toggleTheme}
          onShowMindMap={() => setShowMindMap(true)}
          smartCollections={smartCollections}
          onSmartCollectionChange={handleSmartCollectionChange}
          activeSmartCollection={activeSmartCollection}
          onShowPomodoro={() => setShowPomodoro(true)}
          onShowDailyPrompt={() => setShowDailyPrompt(true)}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-heading font-semibold text-elegant capitalize tracking-tight">
                {activeSmartCollection
                  ? smartCollections.find((c) => c.id === activeSmartCollection)?.label
                  : currentView === "all"
                  ? "All Notes"
                  : currentView}
              </h1>
            </div>
            {(currentView === "all" || currentView === "favorites" || currentView === "deleted" || activeSmartCollection) && (
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder={`Search ${activeSmartCollection ? "this collection" : currentView}...`}
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
        {showDailyPrompt && (
          <DailyPromptModal
            prompt={dailyPrompt}
            onClose={() => setShowDailyPrompt(false)}
          />
        )}
        {showPomodoro && <PomodoroTimer onClose={() => setShowPomodoro(false)} />}
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
  );
}

export default App;
