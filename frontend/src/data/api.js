import demoData from './demo_data.json'

// API client — talks to Go backend at /api/*
// In dev mode or static hosting (GitHub Pages), returns demoData

const BASE = '/api'

let _cache = null

// Hosted: HTTP 402 means the household's plan doesn't include this; the
// server says why.
async function mutationError(what, res) {
  if (res.status === 402) {
    const body = await res.text().catch(() => '')
    return new Error(body.trim() || 'Your plan doesn\'t include this. Subscribe to keep editing.')
  }
  return new Error(`${what} failed: ${res.status}`)
}

export async function fetchData() {
  try {
    const res = await fetch(`${BASE}/data`)
    if (res.ok) {
      _cache = await res.json()
      return _cache
    }
    if (res.status === 404) {
      _cache = demoData
      return _cache
    }
    const body = await res.text().catch(() => '')
    throw new Error(body.trim() || `Server error ${res.status}`)
  } catch (e) {
    if (e.message && e.message.startsWith('Server error')) throw e
    _cache = demoData
    return _cache
  }
}

export function getCached() {
  return _cache
}

export async function addRow(sheet, data) {
  const res = await fetch(`${BASE}/${sheet}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw await mutationError('Add', res)
  return res.json()
}

export async function updateRow(sheet, id, patch) {
  const res = await fetch(`${BASE}/${sheet}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw await mutationError('Update', res)
  return res.json()
}

export async function deleteRow(sheet, id) {
  const res = await fetch(`${BASE}/${sheet}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw await mutationError('Delete', res)
  return res.json()
}

export async function generateTaxRecommendations(regime) {
  const res = await fetch(`${BASE}/tax/recommendations/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ regime }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body.trim() || `Server error ${res.status}`)
  }
  return res.json()
}

export async function proposeTaxRules(proposal) {
  const res = await fetch(`${BASE}/tax/rules/propose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proposal),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body.trim() || `Server error ${res.status}`)
  }
  return res.json()
}

export async function approveTaxRule(id) {
  const res = await fetch(`${BASE}/tax/rules/${id}/approve`, { method: 'POST' })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body.trim() || `Server error ${res.status}`)
  }
  return res.json()
}

export async function rejectTaxRule(id) {
  const res = await fetch(`${BASE}/tax/rules/${id}/reject`, { method: 'POST' })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body.trim() || `Server error ${res.status}`)
  }
  return res.json()
}

export async function chatMessage(messages) {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body.trim() || `Server error ${res.status}`)
  }
  const data = await res.json()
  return data.reply
}
