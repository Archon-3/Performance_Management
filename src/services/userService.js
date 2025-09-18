import { apiFetch } from "../lib/api"

export function getMe() {
  return apiFetch("/users/me")
}

export function getUsers() {
  return apiFetch("/users")
}

export function getUserById(id) {
  return apiFetch(`/users/${id}`)
}

export function createUser(payload) {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateUser(id, payload) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}

export function deleteUser(id) {
  return apiFetch(`/users/${id}`, {
    method: "DELETE",
  })
}
