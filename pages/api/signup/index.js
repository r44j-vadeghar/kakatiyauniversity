import User from "../../../models/User";
import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import dbConnect from "../../../utils/mongo";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "POST") {
    try {
      const { uid, branch, dateOfJoining, dateOfPassOut, email, password } =
        req.body;
      validateAllOnce({
        uid,
        branch,
        dateOfJoining,
        dateOfPassOut,
        email,
        password,
      });

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const user = await User.create({ ...req.body, password: hashPassword });

      const userDoc = user._doc;
      delete userDoc.password;

      responseHandler(userDoc, res);
    } catch (error) {
      res.status(400).json(error);
      // errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
