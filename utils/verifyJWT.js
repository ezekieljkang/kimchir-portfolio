import jwt from 'jsonwebtoken';

const verifyJWT = (token) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
};

export default verifyJWT;
