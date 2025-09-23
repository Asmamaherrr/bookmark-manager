"use client";

const NoteCard = ({ note, onToggleFavorite, onEdit, onDelete, theme = "light" }) => {
  // Color definitions for better contrast
  const colors = {
    light: {
      card: {
        background: "bg-white",
        border: "border-gray-200",
        hover: "hover:shadow-xl"
      },
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-700",
        muted: "text-gray-600"
      },
      accent: {
        background: "bg-blue-100",
        text: "text-blue-900",
        hover: "hover:bg-blue-200"
      },
      muted: {
        background: "bg-gray-100",
        text: "text-gray-700"
      },
      destructive: {
        text: "text-red-600",
        hover: "hover:bg-red-50"
      }
    },
    dark: {
      card: {
        background: "bg-blue-800",
        border: "border-blue-700",
        hover: "hover:shadow-2xl hover:shadow-gray-900/50"
      },
      text: {
        primary: "text-blue-100",
        secondary: "text-blue-300",
        muted: "text-blue-400"
      },
      accent: {
        background: "bg-blue-900",
        text: "text-blue-100",
        hover: "hover:bg-blue-800"
      },
      muted: {
        background: "bg-gray-700",
        text: "text-gray-300"
      },
      destructive: {
        text: "text-red-400",
        hover: "hover:bg-red-900/30"
      }
    }
  };

  // Safe access to colors with fallback
  const currentColors = colors[theme] || colors.light;

  if (!note) {
    return (
      <div className={`${currentColors.card.background} border ${currentColors.card.border} rounded-xl p-6 animate-pulse`}>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          <div className="flex gap-1">
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`${currentColors.card.background} border ${currentColors.card.border} rounded-xl p-6 ${currentColors.card.hover} transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-${theme === 'light' ? 'gray-50' : 'gray-700'} opacity-50 pointer-events-none`}></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`font-semibold ${currentColors.text.primary} line-clamp-2 flex-1 text-lg leading-tight tracking-tight`}>
            {note.title}
          </h3>
          <button
            onClick={() => onToggleFavorite(note.id)}
            className={`ml-3 p-2 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              note.isFavorite
                ? `${currentColors.accent.text} ${currentColors.accent.background} hover:${currentColors.accent.hover}`
                : `${currentColors.text.muted} hover:${currentColors.accent.text} hover:${currentColors.accent.background}`
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

        <p className={`${currentColors.text.secondary} text-sm mb-4 line-clamp-3 leading-relaxed`}>
          {note.content}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 ${currentColors.muted.background} ${currentColors.muted.text} text-xs rounded-full font-medium border ${currentColors.card.border} hover:${currentColors.accent.background} hover:${currentColors.accent.text} transition-colors`}
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className={`px-3 py-1.5 ${currentColors.accent.background} ${currentColors.accent.text} text-xs rounded-full font-medium border ${currentColors.card.border}`}>
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className={`text-xs ${currentColors.text.muted} font-medium tracking-wide`}>
            {formatDate(note.createdAt)}
          </span>

          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={() => onEdit(note)}
              className={`${currentColors.text.muted} hover:${currentColors.accent.text} p-2 rounded-full transition-all duration-300 hover:${currentColors.accent.background} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
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
              className={`${currentColors.text.muted} hover:${currentColors.destructive.text} p-2 rounded-full transition-all duration-300 hover:${currentColors.destructive.hover} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50`}
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
  );
};

export default NoteCard;