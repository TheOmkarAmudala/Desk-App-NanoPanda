use crate::models::telemetry::NetworkTelemetry;

use chrono::Local;

pub fn detect_network_connections()
    -> Vec<NetworkTelemetry> {

    let mut connections = vec![];

    let output =
        std::process::Command::new("netstat")

            .arg("-n")

            .output();

    match output {

        Ok(result) => {

            let stdout =
                String::from_utf8_lossy(
                    &result.stdout
                );

            for line in stdout.lines() {

                if line.contains("ESTABLISHED") {

                    connections.push(
                        NetworkTelemetry {

                            connection:
                                line.trim()
                                    .to_string(),

                            timestamp:
                                Local::now()
                                    .format("%Y-%m-%d %H:%M:%S")
                                    .to_string(),
                        }
                    );
                }
            }
        }

        Err(error) => {

            println!(
                "Network detection error: {:?}",
                error
            );
        }
    }

    connections
}