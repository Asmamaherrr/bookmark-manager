"use client";

import React, { useState } from "react";
import { Copy, X } from "lucide-react";

const DailyPromptModal = ({ prompt, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset "Copied!" message
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-2xl w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-elegant">Daily Writing Prompt</h2>
        </div>

        <div className="bg-muted p-6 rounded-lg mb-6 shadow-inner">
          <p className="text-lg font-medium italic text-muted-foreground">{prompt}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center"
          >
            {isCopied ? "Copied!" : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyPromptModal;
