import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
const defaultPasswordHash = bcrypt.hashSync(process.env.DEFAULT_PASSWORD, 10);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const isPasswordValid = bcrypt.compareSync(password, defaultPasswordHash);

    if (isPasswordValid) {
      const token = jwt.sign({}, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token, redirectTo: '/protected' });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
