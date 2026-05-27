use crate::models::telemetry::UsbTelemetry;

use chrono::Local;

pub fn detect_usb_devices()
    -> Vec<UsbTelemetry> {

    let mut usb_logs = vec![];

    let output =
        std::process::Command::new("powershell")

            .arg("-Command")

            .arg(
                "Get-WmiObject Win32_LogicalDisk | Where-Object {$_.DriveType -eq 2} | Select-Object VolumeName"
            )

            .output();

    match output {

        Ok(result) => {

            let stdout =
                String::from_utf8_lossy(
                    &result.stdout
                );

            for line in stdout.lines() {

                let trimmed = line.trim();

                if !trimmed.is_empty()
                    && trimmed != "VolumeName"
                {

                    usb_logs.push(
                        UsbTelemetry {

                            device_name:
                                trimmed.to_string(),

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
                "USB detection error: {:?}",
                error
            );
        }
    }

    usb_logs
}