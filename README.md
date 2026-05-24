# faintly

write and forget.

```mermaid
flowchart LR
    you[You type] --> text[Text appears]
    text --> enter[Press Enter]
    enter --> fade[Paragraph fades out]
    fade --> next[Keep going]
```

everything you commit slowly fades into the background. no backspace, no editing old drafts - just forward motion.

```mermaid
flowchart TD
    A[Open app] --> B[Start typing]
    B --> C{Press Enter?}
    C -->|Yes| D[Paragraph saved to history]
    C -->|No| E[Keep writing]
    D --> F[Paragraph starts fading]
    F --> G[Write next one]
```

## stack

- frontend: react + tailwind + typescript
- backend: rust + tauri 2
- export: native save dialog, writes .md / .txt

```mermaid
flowchart LR
    subgraph Frontend
        RE[React] -- invoke --> TA[Tauri API]
    end
    subgraph Backend
        TA --> RU[Rust command]
        RU --> FD[rfd save dialog]
        FD --> FS[Write file]
    end
```

## run it

```bash
npm install
npm run tauri dev
```

## build

```bash
npm run tauri build
```

exe ends up in `src-tauri/target/release/`. no server, no cloud, no bullshit.

## why

sometimes the only way to get words out is to not look at them again.
