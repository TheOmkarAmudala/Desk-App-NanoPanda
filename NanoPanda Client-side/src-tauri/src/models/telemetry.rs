use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
pub struct NetworkTelemetry {

    pub connection: String,

    pub timestamp: String,
}

#[derive(Debug, Serialize, Clone)]
pub struct UsbTelemetry {

    pub device_name: String,

    pub timestamp: String,
}

#[derive(Debug, Serialize, Clone)]
pub struct WindowTelemetry {

    pub app_name: String,

    pub window_title: String,

    pub timestamp: String,
}