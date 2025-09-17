"use client"

const Sidebar = ({ currentView, onViewChange, onCreateNote, onLogin, onSignup }) => {
  const menuItems = [
    {
      id: "all",
      label: "All Notes",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      id: "deleted",
      label: "Deleted",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
    },
  ]

  return (
    <aside className="w-16 md:w-72 bg-white border-r border-gray-200 flex flex-col shadow-lg font-body transition-all duration-300">
      <div className="p-3 md:p-6 border-b border-gray-100">
        <h2 className="text-2xl font-heading font-semibold text-gradient text-elegant hidden md:block">BrainBox</h2>
        <p className="text-sm text-gray-500 mt-1 text-refined hidden md:block">
          Organize your thoughts, simplify your day
        </p>
        <div className="md:hidden flex justify-center">
          <div className="w-full h-12 bg-gradient-to-r from-black to-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-xl text-white font-bold text-sm">B</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2 md:p-6">
        <button
          onClick={onCreateNote}
          className="w-full mb-4 md:mb-6 btn-primary hover-glow animate-pulse-glow flex items-center justify-center gap-4 group font-medium text-refined"
        >
          <svg
            className="w-5 h-5 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden md:inline">Create Note</span>
        </button>

        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={item.id} className={`animate-slide-in-right stagger-${index + 1}`}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full px-2 md:px-4 py-3 rounded-xl text-left transition-all duration-300 flex items-center gap-4 group ${
                  currentView === item.id
                    ? "bg-gradient-to-r from-black to-gray-700 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-50 hover:shadow-md hover-scale"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${currentView === item.id ? "scale-110" : "group-hover:scale-110"} md:ml-0 mx-auto md:mx-0`}
                >
                  {item.icon}
                </span>
                <span className="font-medium text-refined hidden md:inline">{item.label}</span>
                {currentView === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse hidden md:block"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-2 md:p-6 border-t border-gray-100 space-y-3 bg-gray-50">
        <button
          onClick={onLogin}
          className="w-full px-2 md:px-4 py-3 btn-secondary hover-scale flex items-center gap-3 group justify-center md:justify-start"
        >
          <svg
            className="w-5 h-6 md:w-5 md:h-5 group-hover:scale-110 transition-transform flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-medium text-refined hidden md:inline">Login</span>
        </button>
        <button
          onClick={onSignup}
          className="w-full px-2 md:px-4 py-3 btn-secondary hover-scale flex items-center gap-3 group justify-center md:justify-start"
        >
          <svg
            className="w-5 h-6 md:w-5 md:h-5 group-hover:scale-110 transition-transform flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span className="font-medium text-refined hidden md:inline">Sign Up</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
