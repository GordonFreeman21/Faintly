import React from "react";
import { Stats } from "../types";
import { Download, Trash2, Eye, EyeOff } from "lucide-react";

interface StatusBarProps {
  stats: Stats;
  emergencyReveal: boolean;
  onToggleReveal: () => void;
  onExport: () => void;
  onClear: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  stats,
  emergencyReveal,
  onToggleReveal,
  onExport,
  onClear,
}) => {
  return (
    <footer className="w-full h-12 border-t border-white/[0.03] bg-paper px-6 flex items-center justify-between font-sans text-xs text-gray-500 select-none">
      <div className="flex space-x-6">
        <span>
          Words: <b className="text-gray-400 font-medium">{stats.words}</b>
        </span>
        <span>
          Chars: <b className="text-gray-400 font-medium">{stats.characters}</b>
        </span>
        <span>
          Paragraphs: <b className="text-gray-400 font-medium">{stats.paragraphs}</b>
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleReveal}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-colors ${
            emergencyReveal
              ? "text-accent bg-accent/10 hover:bg-accent/20"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
          }`}
          title="Toggle emergency viewing of older paragraphs"
        >
          {emergencyReveal ? <EyeOff size={13} /> : <Eye size={13} />}
          <span>{emergencyReveal ? "Conceal" : "Emergency Reveal"}</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-colors"
          title="Export current draft file"
        >
          <Download size={13} />
          <span>Export</span>
        </button>

        <button
          onClick={onClear}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-red-500/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Reset document canvas completely"
        >
          <Trash2 size={13} />
          <span>Reset</span>
        </button>
      </div>
    </footer>
  );
};
