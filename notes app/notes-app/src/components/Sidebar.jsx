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

  // Updated color definitions to match App.js themes
  const colors = {
    light: {
      background: "bg-amber-50",
      card: "bg-white",
      border: "border-amber-200",
      primary: "text-amber-900",
      secondary: "text-amber-700",
      muted: "text-amber-600",
      accent: "bg-amber-100",
      accentForeground: "text-amber-900",
      hover: "bg-amber-100",
      active: "bg-amber-500",
      activeText: "text-white"
    },
    dark: {
      background: "bg-gray-900",
      card: "bg-gray-800",
      border: "border-gray-700",
      primary: "text-gray-100",
      secondary: "text-gray-300",
      muted: "text-gray-400",
      accent: "bg-blue-900",
      accentForeground: "text-blue-100",
      hover: "bg-gray-700",
      active: "bg-blue-600",
      activeText: "text-white"
    },
    blueLight: {
      background: "bg-blue-50",
      card: "bg-white",
      border: "border-blue-200",
      primary: "text-blue-900",
      secondary: "text-blue-700",
      muted: "text-blue-600",
      accent: "bg-blue-100",
      accentForeground: "text-blue-900",
      hover: "bg-blue-100",
      active: "bg-blue-500",
      activeText: "text-white"
    },
    greenLight: {
      background: "bg-emerald-50",
      card: "bg-white",
      border: "border-emerald-200",
      primary: "text-emerald-900",
      secondary: "text-emerald-700",
      muted: "text-emerald-600",
      accent: "bg-emerald-100",
      accentForeground: "text-emerald-900",
      hover: "bg-emerald-100",
      active: "bg-emerald-500",
      activeText: "text-white"
    },
    sepia: {
      background: "bg-amber-50",
      card: "bg-amber-100",
      border: "border-amber-200",
      primary: "text-amber-900",
      secondary: "text-amber-800",
      muted: "text-amber-700",
      accent: "bg-amber-200",
      accentForeground: "text-amber-900",
      hover: "bg-amber-200",
      active: "bg-amber-600",
      activeText: "text-white"
    }
  };

  // Safe access to colors with fallback
  const currentColors = colors[theme] || colors.light;

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
            ? `${currentColors.accent} ${currentColors.accentForeground} shadow-md`
            : `${currentColors.muted} hover:${currentColors.hover}`
        }
        ${isSecondary ? "text-sm" : ""}`}
    >
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 mr-4
          ${
            isActive
              ? `${currentColors.active} ${currentColors.activeText}`
              : `bg-opacity-50 ${currentColors.hover} ${currentColors.muted} group-hover:${currentColors.accent} group-hover:${currentColors.accentForeground}`
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
        className={`flex items-center w-full py-2 px-4 rounded-xl transition-colors duration-200 font-normal hover:${currentColors.hover} text-left
        ${isActive ? `${currentColors.hover} ${currentColors.primary} font-semibold` : currentColors.muted}`}
      >
        <Bookmark className="w-4 h-4 mr-3" />
        <span>{collection.label}</span>
      </button>
    );
  };

  // Get appropriate theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case 'dark': return <Sun size={20} />;
      case 'blueLight': return <Palette size={20} />;
      case 'greenLight': return <Palette size={20} />;
      case 'sepia': return <Palette size={20} />;
      default: return <Moon size={20} />;
    }
  };

  return (
    <aside className={`w-72 ${currentColors.card} border-r ${currentColors.border} flex flex-col transition-colors duration-300 h-full`}>
      {/* Fixed header section */}
      <div className={`p-6 flex-shrink-0 border-b ${currentColors.border}`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold font-heading ${currentColors.primary}`}>Notes.</h1>
          <button
            onClick={onCreateNote}
            className={`p-2 rounded-lg ${currentColors.hover} ${currentColors.primary} hover:${currentColors.accent} hover:${currentColors.accentForeground} transition-colors`}
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
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ease-in-out font-medium ${currentColors.muted} hover:${currentColors.hover}`}
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 mr-4 ${currentColors.hover} ${currentColors.muted}`}>
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
      <div className={`flex-shrink-0 border-t ${currentColors.border}`}>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className={`text-sm font-semibold ${currentColors.muted}`}>
              Theme
            </span>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full hover:${currentColors.hover} transition-colors ${currentColors.primary}`}
              title={`Current: ${theme}`}
            >
              {getThemeIcon()}
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