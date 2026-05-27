use std::fs;

use std::process::Command;

#[tauri::command]
pub fn save_face_embedding(

    image_data: String

) -> Result<String, String> {

    // REMOVE BASE64 PREFIX
    let base64_data = image_data
        .replace(
            "data:image/jpeg;base64,",
            ""
        );

    // DECODE BASE64
    let image_bytes =
        base64::decode(base64_data)
            .map_err(|e| e.to_string())?;

    // SAVE IMAGE
    fs::write(
        "capture.jpg",
        image_bytes
    )
    .map_err(|e| e.to_string())?;

    // RUN PYTHON SCRIPT
    Command::new("python")

        .arg("face_verify.py")

        .spawn()

        .map_err(|e| e.to_string())?;

    Ok(
        "Embedding generation started"
            .into()
    )

}