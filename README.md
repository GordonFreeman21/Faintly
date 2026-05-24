# Faintly

A writing app where everything you type slowly fades away. No backspace. No editing what you just wrote. Just keep going.

Hit Enter and the paragraph starts dissolving. Write the next one. Repeat until you're done.

## Stack

- React + Tailwind + TypeScript on the frontend
- Rust + Tauri 2 for the desktop shell
- Native save dialog (rfd) to export .md or .txt files

## Run it

```bash
npm install
npm run tauri dev
```

## Build

```bash
npm run tauri build
```

Binary ends up in `src-tauri/target/release/`. No server, no cloud.

## Why

Sometimes the only way to get words out is to stop looking at them.
