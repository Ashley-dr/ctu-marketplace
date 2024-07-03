/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
dotenv.config();

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};