import { server } from "config"

export async function verifyAuthStatus( csrf: string | undefined, session: string | undefined) {
  const hasAuth = !!csrf && !!session
  if (!hasAuth) return { isAuth: false }

  const encodedCsrf = `${encodeURIComponent('csrf')}=${encodeURIComponent(csrf)}`
  const encodedSession = `${encodeURIComponent('session')}=${encodeURIComponent(session)}`
  const cookies = `${encodedCsrf}; ${encodedSession}`

  const res = await fetch(`${server}/api/auth/verify`, {
    method: 'post',
    credentials: "include",
    headers: {
      'Cookie': cookies
    },
    body: JSON.stringify({ csrf: encodeURIComponent(csrf) })
  })
  const { data } = await res.json();
  return data ? { isAuth: true, data } : { isAuth: false }
}