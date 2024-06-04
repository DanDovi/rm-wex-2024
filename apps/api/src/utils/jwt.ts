import { config } from "dotenv";
import createError from "http-errors";
import jwt from "jsonwebtoken";

config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new Error("ACCESS_TOKEN_SECRET must be provided");
}

const signAccessToken = (payload: unknown) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;

        return reject(createError.Unauthorized(message));
      }
      resolve(payload);
    });
  });
};

export { signAccessToken, verifyAccessToken };
