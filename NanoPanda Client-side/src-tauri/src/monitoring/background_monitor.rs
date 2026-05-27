use std::{
    fs,
    thread,
    time::Duration,
};

use std::process::Command;

use chrono::Local;

use sysinfo::{
    ProcessesToUpdate,
    System
};

use tauri::{
    AppHandle,
    Manager
};

use tauri_plugin_notification::NotificationExt;

use crate::AppState;

use crate::models::app_log::AppLog;

use crate::monitoring::observation::start_observation_session;

pub fn start_background_monitor(
    app: AppHandle
) {

    thread::spawn(move || {

        println!("Background monitor started...");

        let mock_data =
            fs::read_to_string(
                "mock_apps.json"
            )
            .expect(
                "Unable to read mock_apps.json"
            );

        let mock_apps: Vec<String> =
            serde_json::from_str(
                &mock_data
            )
            .expect("Invalid JSON");

        let state =
            app.state::<AppState>();

        let mut system =
            System::new();

        loop {

            system.refresh_processes(
                ProcessesToUpdate::All,
                true,
            );

            for process in
                system.processes().values()
            {

                let app_name =
                    process.name()
                        .to_string_lossy()
                        .to_string();

                if mock_apps.contains(
                    &app_name
                ) {

                    let mut detected =
                        state
                            .detected_apps
                            .lock()
                            .unwrap();

                    if !detected.contains(
                        &app_name
                    ) {

                        detected.insert(
                            app_name.clone()
                        );

                        let timestamp =
                            Local::now()
                                .format(
                                    "%Y-%m-%d %H:%M:%S"
                                )
                                .to_string();

                        let output =
                            Command::new(
                                "python"
                            )

                            .arg(
                                "../ai/face_verify.py"
                            )

                            .output();

                        match output {

                            Ok(_) => {

                                println!(
                                    "Face verification completed"
                                );

                                start_observation_session();
                            }

                            Err(error) => {

                                println!(
                                    "Python error: {:?}",
                                    error
                                );
                            }
                        }

                        println!(
                            "{} opened at {}",
                            app_name,
                            timestamp
                        );

                        state.logs
                            .lock()
                            .unwrap()

                            .push(AppLog {

                                app_name:
                                    app_name.clone(),

                                timestamp,
                            });

                        app.notification()
                            .builder()

                            .title(
                                "Verification"
                            )

                            .body(
                                "Background verification is going on..."
                            )

                            .show()

                            .unwrap();
                    }
                }
            }

            thread::sleep(
                Duration::from_secs(5)
            );
        }
    });
}