import * as admin from 'firebase-admin';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const verifySessionCookie = async (req: NextApiRequest) => {
  const sessionCookie = req.cookies.session;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
};
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
  if (!req.body) { 
    console.log(`+++ error: Invalid CSRF token`);
    return res.status(403).json({ error: 'Invalid CSRF token' }); 
  }
  const csrfToken = req.cookies.csrf;
  const body = JSON.parse(req.body)

  // console.log(`+++csrf from cookie: ${csrfToken}`)
  // console.log(`+++csrf from client: ${csrfFromClient}`)
  
  if (!csrfToken || !body.csrf || csrfToken !== body.csrf) {
    console.log(`+++ error: Invalid CSRF token`);
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  // Verify the session cookie and obtain the user information
  const decodedClaims = await verifySessionCookie(req);
  
  if (decodedClaims) {
    const { uid } = decodedClaims;
    console.log(`+++ success!`)
    return res.status(200).json({ data: { uid } });
  } 

  console.log(`+++ error: Unauthorized!`)
  return res.status(401).json({ error: 'Unauthorized' });
};

const serverHandler: NextApiHandler = async (req, res) => {
  await runMiddleware(req, res, cors)
  await handler (req, res)
}

export default serverHandler;