"use client";

import React from "react";
import {
  Notebook,
  Star,
  Trash2,
  Settings,
  Plus,
  Moon,
  Sun,
  Palette,
  LayoutGrid,
  Map,
  Timer,
  BookOpenText,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({
  currentView,
  onViewChange,
  onCreateNote,
  onLogin,
  onSignup,
  theme,
  toggleTheme,
  onShowMindMap,
  smartCollections,
  onSmartCollectionChange,
  activeSmartCollection,
  onShowPomodoro,
  onShowDailyPrompt
}) => {
  const [showSmartCollections, setShowSmartCollections] = useState(false);

  const SidebarButton = ({
    icon,
    label,
    onClick,
    isActive,
    isSecondary = false,
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ease-in-out font-medium group
        ${
          isActive
            ? "bg-accent text-accent-foreground shadow-md"
            : "text-muted-foreground hover:bg-muted"
        }
        ${isSecondary ? "text-sm" : ""}`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 mr-4
          ${
            isActive
              ? "bg-accent-foreground text-accent"
              : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
          }`}
      >
        {icon}
      </div>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );

  const SmartCollectionButton = ({ collection }) => {
    const isActive = activeSmartCollection === collection.id;
    return (
      <button
        onClick={() => onSmartCollectionChange(collection.id)}
        className={`flex items-center w-full py-2 px-4 rounded-xl transition-colors duration-200 font-normal hover:bg-muted text-left
        ${isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground"}`}
      >
        <Bookmark className="w-4 h-4 mr-3" />
        <span>{collection.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col transition-colors duration-300 h-full">
      {/* Fixed header section */}
      <div className="p-6 flex-shrink-0 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-heading text-primary">Notes.</h1>
          <button
            onClick={onCreateNote}
            className="btn-primary-icon p-2"
            title="Create New Note"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable navigation section */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 pb-4">
          <nav className="space-y-2">
            <SidebarButton
              icon={<LayoutGrid />}
              label="All Notes"
              onClick={() => onViewChange("all")}
              isActive={currentView === "all" && !activeSmartCollection}
            />
            <SidebarButton
              icon={<Star />}
              label="Favorites"
              onClick={() => onViewChange("favorites")}
              isActive={currentView === "favorites"}
            />
            <SidebarButton
              icon={<Trash2 />}
              label="Deleted"
              onClick={() => onViewChange("deleted")}
              isActive={currentView === "deleted"}
            />
            
            {/* Smart Collections with toggle */}
            <div className="space-y-2">
              <button
                onClick={() => setShowSmartCollections(!showSmartCollections)}
                className="flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out font-medium text-muted-foreground hover:bg-muted"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 mr-4 bg-muted text-muted-foreground">
                  <Bookmark className="w-5 h-5" />
                </div>
                <span className="flex-1 text-left">Smart Collections</span>
                {showSmartCollections ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {showSmartCollections && (
                <div className="pl-4 space-y-1 animate-fade-in">
                  {smartCollections.map((collection) => (
                    <SmartCollectionButton
                      key={collection.id}
                      collection={collection}
                    />
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Tools section */}
          <div className="space-y-2 mt-6">
            <SidebarButton
              icon={<BookOpenText />}
              label="Daily Prompt"
              onClick={onShowDailyPrompt}
              isSecondary
            />
            <SidebarButton
              icon={<Timer />}
              label="Pomodoro Timer"
              onClick={onShowPomodoro}
              isSecondary
            />
            <SidebarButton
              icon={<Map />}
              label="Mind Map"
              onClick={onShowMindMap}
              isSecondary
            />
          </div>
        </div>
      </div>

      {/* Fixed footer section */}
      <div className="flex-shrink-0 border-t border-border">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Theme
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          <div className="space-y-1">
          
            <SidebarButton
              icon={<Plus />}
              label="Login"
              onClick={onLogin}
              isSecondary
            />
            <SidebarButton
              icon={<Palette />}
              label="Signup"
              onClick={onSignup}
              isSecondary
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;