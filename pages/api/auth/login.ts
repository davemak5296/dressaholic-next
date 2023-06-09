import * as admin from 'firebase-admin';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import Cors from 'cors';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const cors = Cors({
  // origin: `${server}`,
  methods: ['POST', 'GET', 'HEAD'],
  // credentials: true
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
async function handler (req: NextApiRequest, res: NextApiResponse) {
// export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const csrfToken = req.cookies.csrf;
  const { csrf: csrfFromClient, idToken } = req.body
  
  if (!csrfToken || !csrfFromClient || csrfToken !== csrfFromClient) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  const expiresIn = 60*60*1000;

  admin.auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        res.setHeader('Set-Cookie', serialize('session', sessionCookie, { path: '/', maxAge: expiresIn/1000 }))
        res.status(200).json({ status: 'success'})
      },
      (error) => {
        console.log(`error creating session cookie, ${error}`)
        res.status(401).send('Unauthorized Request!')
      }
    )
}

const serverHandler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)
  await handler (req, res)
}

export default serverHandler;