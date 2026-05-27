// src/services/secureStorage.ts
// Wrapper around Tauri v2's plugin-fs for secure token storage.
// Falls back to localStorage when running in a non‑Tauri environment (e.g., dev server).

import { readTextFile, writeTextFile, remove } from '@tauri-apps/plugin-fs';
import { appDataDir } from '@tauri-apps/api/path';

const FILE_NAME = 'jwt_token.txt';

async function tokenPath(): Promise<string> {
  const dir = await appDataDir();
  // Ensure a trailing slash (appDataDir already includes one)
  return `${dir}${FILE_NAME}`;
}

/** Store JWT securely */
export async function setToken(token: string): Promise<void> {
  try {
    const path = await tokenPath();
    await writeTextFile(path, token);
  } catch (e) {
    // Development fallback
    localStorage.setItem(FILE_NAME, token);
  }
}

/** Retrieve stored JWT */
export async function getToken(): Promise<string | null> {
  try {
    const path = await tokenPath();
    return await readTextFile(path);
  } catch (e) {
    return localStorage.getItem(FILE_NAME);
  }
}

/** Remove stored JWT */
export async function clearToken(): Promise<void> {
  try {
    const path = await tokenPath();
    await remove(path);
  } catch (e) {
    localStorage.removeItem(FILE_NAME);
  }
}
