import { useDocument } from "./hooks/useDocument";
import { EditorCanvas } from "./components/EditorCanvas";
import { StatusBar } from "./components/StatusBar";

function App() {
  const {
    state,
    stats,
    emergencyReveal,
    setEmergencyReveal,
    updateActiveText,
    commitParagraph,
    clearDocument,
    exportDocument,
  } = useDocument();

  return (
    <div className="h-screen w-screen flex flex-col bg-background select-none">
      {/* Header with pulsing dot and branding */}
      <header className="h-14 w-full flex items-center justify-between px-6 border-b border-white/[0.03] select-none">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
          <h1 className="font-sans text-sm tracking-[0.18em] uppercase text-gray-300 font-bold">
            Faintly
          </h1>
        </div>
        <div className="text-[10px] tracking-wider text-gray-600 font-mono">
          VOMIT DRAFTING MODE ENABLED
        </div>
      </header>

      <EditorCanvas
        history={state.history}
        activeText={state.activeText}
        onChangeActive={updateActiveText}
        onCommit={commitParagraph}
        emergencyReveal={emergencyReveal}
      />

      <StatusBar
        stats={stats}
        emergencyReveal={emergencyReveal}
        onToggleReveal={() => setEmergencyReveal((prev) => !prev)}
        onExport={exportDocument}
        onClear={clearDocument}
      />
    </div>
  );
}

export default App;
