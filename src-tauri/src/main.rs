// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::Write;

/// Opens a native file-save dialog from the OS (via rfd),
/// then writes the draft content to the chosen path.
#[tauri::command]
async fn save_file(content: String) -> Result<String, String> {
    let file_path = rfd::AsyncFileDialog::new()
        .add_filter("Markdown", &["md"])
        .add_filter("Text File", &["txt"])
        .set_title("Export Faintly Manuscript")
        .save_file()
        .await;

    match file_path {
        Some(handle) => {
            let path = handle.path();
            let mut file = File::create(path).map_err(|e| e.to_string())?;
            file.write_all(content.as_bytes()).map_err(|e| e.to_string())?;
            Ok(format!("Successfully exported to: {}", path.display()))
        }
        None => Err("Export cancelled by user".to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![save_file])
        .run(tauri::generate_context!())
        .expect("error while running Faintly application");
}
