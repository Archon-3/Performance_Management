import { apiFetch } from "../lib/api"

export function getEvaluations() {
  return apiFetch("/evaluations")
}

export function getMemberEvaluations() {
  return apiFetch("/evaluations/member")
}

export function getTemplates() {
  return apiFetch("/evaluations/templates")
}

export function createEvaluation(payload) {
  return apiFetch("/evaluations", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
