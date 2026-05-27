use sysinfo::{
    ProcessesToUpdate,
    System
};

use crate::AppState;

use crate::models::app_log::AppLog;

use crate::models::running_app::RunningApp;

#[tauri::command]
pub async fn get_running_apps()
    -> Result<Vec<RunningApp>, String> {

    println!(
        "Fetching running applications..."
    );

    let mut system = System::new();

    system.refresh_processes(
        ProcessesToUpdate::All,
        true,
    );

    let apps: Vec<RunningApp> =

        system
            .processes()
            .values()

            .filter_map(|process| {

                let memory_kb =
                    process.memory();

                if memory_kb < 1000 {

                    return None;
                }

                Some(RunningApp {

                    name:
                        process.name()
                            .to_string_lossy()
                            .to_string(),

                    pid:
                        process.pid()
                            .as_u32(),

                    memory_mb:
                        memory_kb as f64 / 1024.0,
                })
            })

            .collect();

    println!(
        "Found {} running apps",
        apps.len()
    );

    Ok(apps)
}

#[tauri::command]
pub fn get_logs(
    state: tauri::State<AppState>
) -> Vec<AppLog> {

    state
        .logs
        .lock()
        .unwrap()
        .clone()
}