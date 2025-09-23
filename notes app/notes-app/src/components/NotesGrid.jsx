"use client";

import NoteCard from "./NoteCard";
import EmptyState from "./EmptyState";
import { groupNotesByTime } from "../utils/timeGrouping";

const NotesGrid = ({ 
  notes = [], 
  onToggleFavorite, 
  onEdit, 
  onDelete, 
  searchQuery, 
  currentView, 
  activeSmartCollection,
  theme = "light"
}) => {
  // Color definitions that match the App.js themes
  const colors = {
    light: {
      background: "bg-amber-50",
      text: {
        primary: "text-amber-900",
        secondary: "text-amber-700",
        muted: "text-amber-600"
      },
      border: "border-amber-200",
      accent: "bg-amber-100"
    },
    dark: {
      background: "bg-gray-900",
      text: {
        primary: "text-gray-100",
        secondary: "text-gray-300",
        muted: "text-gray-400"
      },
      border: "border-gray-700",
      accent: "bg-gray-800"
    },
    blueLight: {
      background: "bg-blue-50",
      text: {
        primary: "text-blue-900",
        secondary: "text-blue-700",
        muted: "text-blue-600"
      },
      border: "border-blue-200",
      accent: "bg-blue-100"
    },
    greenLight: {
      background: "bg-emerald-50",
      text: {
        primary: "text-emerald-900",
        secondary: "text-emerald-700",
        muted: "text-emerald-600"
      },
      border: "border-emerald-200",
      accent: "bg-emerald-100"
    },
    sepia: {
      background: "bg-amber-50",
      text: {
        primary: "text-amber-900",
        secondary: "text-amber-800",
        muted: "text-amber-700"
      },
      border: "border-amber-200",
      accent: "bg-amber-200"
    }
  };

  // Safe access to colors with fallback
  const currentColors = colors[theme] || colors.light;

  if (!notes || notes.length === 0) {
    return <EmptyState searchQuery={searchQuery} currentView={currentView} activeSmartCollection={activeSmartCollection} theme={theme} />;
  }

  // Group notes by time for 'all' view
  if (currentView === "all") {
    const groupedNotes = groupNotesByTime(notes);

    return (
      <div className={`p-6 ${currentColors.background} min-h-full`}>
        {Object.entries(groupedNotes).map(([timeGroup, groupNotes]) => (
          <div key={timeGroup} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h3 className={`text-lg font-semibold ${currentColors.text.primary}`}>
                {timeGroup}
              </h3>
              <span className={`px-2 py-1 ${currentColors.accent} ${currentColors.text.muted} text-sm rounded-full`}>
                {groupNotes.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupNotes.map((note, index) => (
                <div key={note.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <NoteCard 
                    note={note} 
                    onToggleFavorite={onToggleFavorite}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    theme={theme}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Regular grid for other views
  return (
    <div className={`p-6 ${currentColors.background} min-h-full`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note, index) => (
          <div key={note.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <NoteCard 
              note={note} 
              onToggleFavorite={onToggleFavorite}
              onEdit={onEdit}
              onDelete={onDelete}
              theme={theme}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesGrid;