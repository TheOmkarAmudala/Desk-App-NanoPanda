// src/services/api.js
// Central API helper using secureStorage for JWT handling

import { getToken, setToken, clearToken } from './secureStorage';

const API_BASE = 'https://nanopandab2b.onrender.com/api';

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.success) {
    await setToken(data.token);
  }
  return data;
}

export async function register(name, email, password, companyName) {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, companyName })
  });
  const data = await res.json();
  if (data.success) {
    await setToken(data.token);
  }
  return data;
}

export async function fetchInvitations() {
  const token = await getToken();
  const res = await fetch(`${API_BASE}/invitations/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function acceptInvitation(id) {
  const token = await getToken();
  const res = await fetch(`${API_BASE}/invitations/accept/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function rejectInvitation(id) {
  const token = await getToken();
  const res = await fetch(`${API_BASE}/invitations/${id}/reject`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function logout() {
  await clearToken();
}
