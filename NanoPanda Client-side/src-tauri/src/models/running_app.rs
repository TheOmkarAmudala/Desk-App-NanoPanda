use serde::Serialize;

#[derive(Debug, Serialize, Clone)]
pub struct RunningApp {

    pub name: String,

    pub pid: u32,

    pub memory_mb: f64,
}