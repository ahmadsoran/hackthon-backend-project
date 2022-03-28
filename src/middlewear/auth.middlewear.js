import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config("dotenv");

export default function RegisterAuth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const userAuthJWT = jwt.verify(token, process.env.JWT_KEY);
    req.user = userAuthJWT;
  } catch (error) {
    return res.status(401).json({ error: "you are snot authorized" });
  }
  next();
}
