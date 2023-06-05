import {randomBytes} from 'crypto';

export default function generateCsrfToken() {
  return randomBytes(24).toString('hex')
}