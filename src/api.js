// Backend for Absher login.
const BASE = 'https://eservicealriyadhserver.vercel.app'
const LOGIN_URL = `${BASE}/api/app/absher/login`

// The server responds { success, message, data: { user } }. Unwrap to the user.
function unwrapUser(body) {
  let payload = body
  if (payload && payload.data && typeof payload.data === 'object') payload = payload.data
  if (payload && payload.user) payload = payload.user
  return payload
}

function serverMessage(body, status) {
  return (body && (body.message || body.error || body.msg)) || `Login failed (${status})`
}

// Logs in with an ID and PIN. On success resolves to the user object; on failure
// throws an Error carrying the server's message.
//
// Uses the webview's own fetch (same path as the browser): the API allows
// cross-origin requests (ACAO: *), and Chromium handles the networking.
export async function login(id, pin) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 60000)

  let res
  try {
    res = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, pin }),
      signal: controller.signal,
    })
  } catch (e) {
    console.error('login request failed', e)
    throw new Error('Network error. Please check your connection and try again.')
  } finally {
    clearTimeout(timer)
  }

  let body = null
  try {
    body = await res.json()
  } catch {
    /* non-JSON response */
  }

  if (!res.ok || (body && body.success === false)) throw new Error(serverMessage(body, res.status))
  return unwrapUser(body)
}
