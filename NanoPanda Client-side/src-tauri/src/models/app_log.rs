use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
pub struct AppLog {

    pub app_name: String,

    pub timestamp: String,
}