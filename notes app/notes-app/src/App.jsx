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

  // Comfortable color themes for eyes
  const themes = {
    light: {
      background: "bg-amber-50",
      foreground: "text-amber-900",
      border: "border-amber-200",
      accent: "text-amber-700",
      muted: "text-amber-600",
      card: "bg-white",
      hover: "bg-amber-100"
    },
    dark: {
      background: "bg-gray-900",
      foreground: "text-gray-100",
      border: "border-gray-700",
      accent: "text-gray-300",
      muted: "text-gray-400",
      card: "bg-gray-800",
      hover: "bg-gray-700"
    },
    // Additional comfortable themes
    blueLight: {
      background: "bg-blue-50",
      foreground: "text-blue-900",
      border: "border-blue-200",
      accent: "text-blue-700",
      muted: "text-blue-600",
      card: "bg-white",
      hover: "bg-blue-100"
    },
    greenLight: {
      background: "bg-emerald-50",
      foreground: "text-emerald-900",
      border: "border-emerald-200",
      accent: "text-emerald-700",
      muted: "text-emerald-600",
      card: "bg-white",
      hover: "bg-emerald-100"
    },
    sepia: {
      background: "bg-amber-50",
      foreground: "text-amber-900",
      border: "border-amber-200",
      accent: "text-amber-800",
      muted: "text-amber-700",
      card: "bg-amber-100",
      hover: "bg-amber-200"
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Apply theme classes to document
    document.documentElement.className = themes[savedTheme]?.background || themes.light.background;
    
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
    const themeCycle = {
      light: "dark",
      dark: "blueLight",
      blueLight: "greenLight",
      greenLight: "sepia",
      sepia: "light"
    };
    
    const newTheme = themeCycle[theme] || "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.className = themes[newTheme].background;
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

  const currentTheme = themes[theme] || themes.light;

  return (
    <div className={`app-container h-screen transition-colors duration-500 ${currentTheme.background} ${currentTheme.foreground}`}>
      <div className="flex h-screen font-body transition-colors duration-300">
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
          <div className={`p-6 border-b transition-colors duration-300 ${currentTheme.border}`}>
            <div className="flex items-center justify-between mb-4">
              <h1 className={`text-3xl font-heading font-semibold capitalize tracking-tight ${currentTheme.foreground}`}>
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
                theme={theme}
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
              activeSmartCollection={activeSmartCollection}
              theme={theme}
            />
          </div>
        </main>
        {showDailyPrompt && (
          <DailyPromptModal
            prompt={dailyPrompt}
            onClose={() => setShowDailyPrompt(false)}
            theme={theme}
          />
        )}
        {showPomodoro && (
          <PomodoroTimer 
            onClose={() => setShowPomodoro(false)} 
            theme={theme}
          />
        )}
        {showCreateForm && (
          <CreateNoteForm
            onSubmit={handleCreateNote}
            onClose={() => setShowCreateForm(false)}
            theme={theme}
          />
        )}
        {editingNote && (
          <CreateNoteForm
            note={editingNote}
            onSubmit={handleEditNote}
            onClose={() => setEditingNote(null)}
            theme={theme}
          />
        )}
        {showMindMap && (
          <MindMap
            onClose={() => setShowMindMap(false)}
            onSave={handleSaveMindMap}
            initialData={mindMapData}
            theme={theme}
          />
        )}
        {showLoginForm && (
          <LoginForm 
            onClose={() => setShowLoginForm(false)} 
            theme={theme}
          />
        )}
        {showSignupForm && (
          <SignupForm 
            onClose={() => setShowSignupForm(false)} 
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}

export default App;