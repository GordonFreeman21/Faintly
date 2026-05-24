import { useState, useMemo, useCallback, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { DocumentState, Paragraph, Stats } from "../types";

// Saves state to localStorage so you don't lose your draft on refresh
const LOCAL_STORAGE_KEY = "faintly_autosave_state";

export function useDocument() {
  const [state, setState] = useState<DocumentState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Autosave load failed, resetting state.", e);
      }
    }
    return { history: [], activeText: "" };
  });

  const [emergencyReveal, setEmergencyReveal] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateActiveText = useCallback((text: string) => {
    setState((prev) => ({ ...prev, activeText: text }));
  }, []);

  const commitParagraph = useCallback(() => {
    setState((prev) => {
      const trimmed = prev.activeText.trim();
      if (!trimmed) return prev;

      const newParagraph: Paragraph = {
        id: crypto.randomUUID(),
        text: trimmed,
        timestamp: Date.now(),
      };

      return {
        history: [...prev.history, newParagraph],
        activeText: "",
      };
    });
  }, []);

  const clearDocument = useCallback(() => {
    if (window.confirm("Are you sure you want to delete your progress? This cannot be undone.")) {
      setState({ history: [], activeText: "" });
      setEmergencyReveal(false);
    }
  }, []);

  // Words / chars / paragraph count from the full buffer
  const stats = useMemo<Stats>(() => {
    const allText = [...state.history.map((p) => p.text), state.activeText]
      .filter(Boolean)
      .join(" ");

    const words = allText.trim() === "" ? 0 : allText.trim().split(/\s+/).length;
    const characters = allText.length;
    const paragraphs = state.history.length + (state.activeText.trim() ? 1 : 0);

    return { words, characters, paragraphs };
  }, [state]);

  // Send everything to the Rust backend which opens a save dialog
  const exportDocument = useCallback(async () => {
    const fullContent = [
      ...state.history.map((p) => p.text),
      state.activeText
    ]
      .filter(Boolean)
      .join("\n\n");

    if (!fullContent) {
      alert("No content to export yet!");
      return;
    }

    try {
      const result = await invoke<string>("save_file", { content: fullContent });
      alert(result);
    } catch (err) {
      alert(`Export error: ${err}`);
    }
  }, [state]);

  return {
    state,
    stats,
    emergencyReveal,
    setEmergencyReveal,
    updateActiveText,
    commitParagraph,
    clearDocument,
    exportDocument,
  };
}
