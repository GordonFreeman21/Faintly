import React from "react";
import { Paragraph } from "../types";

interface EditorCanvasProps {
  history: Paragraph[];
  activeText: string;
  onChangeActive: (text: string) => void;
  onCommit: () => void;
  emergencyReveal: boolean;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  history,
  activeText,
  onChangeActive,
  onCommit,
  emergencyReveal,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Keep the textarea height in sync with its content
  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeActive(e.target.value);
  };

  // Auto-resize whenever activeText changes externally (e.g. after commit)
  React.useEffect(() => {
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  }, [activeText]);

  return (
    <main className="flex-1 overflow-y-auto px-6 py-8">
      <div className="mx-auto" style={{ maxWidth: "var(--max-width)" }}>
        {history.map((p) => (
          <p
            key={p.id}
            className={`paragraph ${emergencyReveal ? "" : "fading"}`}
          >
            {p.text}
          </p>
        ))}
        <textarea
          ref={textareaRef}
          className="active-input w-full resize-none overflow-hidden bg-transparent"
          placeholder="Start writing..."
          value={activeText}
          onChange={handleChange}
          onInput={(e) => autoResize(e.currentTarget)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onCommit();
              // Focus stays on the textarea after commit
              textareaRef.current?.focus();
            }
          }}
          rows={1}
        />
      </div>
    </main>
  );
};
