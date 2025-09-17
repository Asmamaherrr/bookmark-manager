import NoteCard from "./NoteCard"
import EmptyState from "./EmptyState"
import { groupNotesByTime } from "../utils/timeGrouping"

const NotesGrid = ({ notes, onToggleFavorite, searchQuery, currentView }) => {
  if (notes.length === 0) {
    return <EmptyState searchQuery={searchQuery} currentView={currentView} />
  }

  // Group notes by time for 'all' view
  if (currentView === "all") {
    const groupedNotes = groupNotesByTime(notes)

    return (
      <div className="p-6">
        {Object.entries(groupedNotes).map(([timeGroup, groupNotes]) => (
          <div key={timeGroup} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{timeGroup}</h3>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{groupNotes.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupNotes.map((note, index) => (
                <div key={note.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <NoteCard note={note} onToggleFavorite={onToggleFavorite} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Regular grid for other views
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note, index) => (
          <div key={note.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <NoteCard note={note} onToggleFavorite={onToggleFavorite} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotesGrid
