# Faintly v1

Been wanting a writing app that just gets out of the way. Everything I tried had too many buttons, too many options, too much *stuff*. So I built this.

You type. You hit Enter. The paragraph fades into the background and you write the next one. That's it. No editing old drafts, no looking back. Just forward.

Made with React and Tailwind on the front, Rust + Tauri 2 on the back.

```bash
npm install
npm run tauri dev
```

To build a release:

```bash
npm run tauri build
```

You'll get an .exe (or .dmg, .deb, AppImage — check the releases page). Nothing else needed, it's just a standalone app.

Why? Sometimes the only way to actually finish something is to stop re-reading what you already wrote.


