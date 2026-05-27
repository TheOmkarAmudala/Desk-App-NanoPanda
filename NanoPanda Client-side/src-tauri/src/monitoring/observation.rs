use active_win_pos_rs::get_active_window;

use crate::models::telemetry::WindowTelemetry;

use crate::monitoring::usb::detect_usb_devices;

use crate::monitoring::network::detect_network_connections;

use chrono::Local;

pub fn start_observation_session() {

    println!("Starting observation session...");

    let mut telemetry_logs:
        Vec<WindowTelemetry> = vec![];

    for _ in 0..60 {

        match get_active_window() {

            Ok(active_window) => {

                let telemetry =
                    WindowTelemetry {

                        app_name:
                            active_window
                                .app_name
                                .to_string(),

                        window_title:
                            active_window
                                .title
                                .to_string(),

                        timestamp:
                            Local::now()
                                .format("%Y-%m-%d %H:%M:%S")
                                .to_string(),
                    };

                println!(
                    "Foreground App: {}",
                    telemetry.app_name
                );

                println!(
                    "Window Title: {}",
                    telemetry.window_title
                );

                telemetry_logs.push(
                    telemetry
                );
            }

            Err(error) => {

                println!(
                    "Window detection error: {:?}",
                    error
                );
            }
        }

        std::thread::sleep(
            std::time::Duration::from_secs(1)
        );
    }

    let usb_devices =
        detect_usb_devices();

    let network_connections =
        detect_network_connections();

    let session = serde_json::json!({

        "window_activity":
            telemetry_logs,

        "usb_devices":
            usb_devices,

        "network_connections":
            network_connections,
    });

    let json =
        serde_json::to_string_pretty(
            &session
        )
        .unwrap();

    std::fs::write(
        "telemetry_session.json",
        json,
    )
    .unwrap();

    println!("Telemetry session saved");
}