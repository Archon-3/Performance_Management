import { apiFetch } from "../lib/api"

export function getTeams() {
  return apiFetch("/teams")
}

export function getTeamById(id) {
  return apiFetch(`/teams/${id}`)
}

export function createTeam(payload) {
  return apiFetch("/teams", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateTeam(id, payload) {
  return apiFetch(`/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}

export function deleteTeam(id) {
  return apiFetch(`/teams/${id}`, {
    method: "DELETE",
  })
}
