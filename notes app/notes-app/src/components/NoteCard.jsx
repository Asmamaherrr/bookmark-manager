"use client"

const NoteCard = ({ note, onToggleFavorite, onEdit, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden stagger-animation hover-lift">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted opacity-50 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-elegant font-semibold text-card-foreground line-clamp-2 flex-1 text-lg leading-tight tracking-tight">
            {note.title}
          </h3>
          <button
            onClick={() => onToggleFavorite(note.id)}
            className={`ml-3 p-2 rounded-full transition-all duration-300 hover:scale-110 focus-ring ${
              note.isFavorite
                ? "text-primary bg-accent/20 hover:bg-accent/30"
                : "text-muted-foreground hover:text-accent-foreground hover:bg-accent/10"
            }`}
          >
            {note.isFavorite ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        </div>

        <p className="text-refined text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{note.content}</p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-full font-medium border border-border/50 hover:bg-accent/20 transition-colors"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="px-3 py-1.5 bg-accent/10 text-accent-foreground text-xs rounded-full font-medium border border-border/50">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-refined text-xs text-muted-foreground font-medium tracking-wide">
            {formatDate(note.createdAt)}
          </span>

               <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1 translate-x-2 group-hover:translate-x-0">
        <button
          onClick={() => onEdit(note)}
          className="hover:text-primary p-2 rounded-full transition-all duration-300 hover:bg-accent/20 hover:scale-110 focus-ring"
          title="Edit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="hover:text-destructive p-2 rounded-full transition-all duration-300 hover:bg-destructive/10 hover:scale-110 focus-ring"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
