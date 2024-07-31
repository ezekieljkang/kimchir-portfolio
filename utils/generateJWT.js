import jwt from 'jsonwebtoken';

const generateJWT = () => {
  const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export default generateJWT;
