import jwt from "jsonwebtoken";

export function jwt_make(payload) {
  return jwt.sign(payload.toJSON(), process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: 86400000 // 1 day
  });
}

export function jwt_verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: 86400000 // 1 day
  });
}
