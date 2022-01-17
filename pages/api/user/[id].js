import User from "../../../models/User";
import { errorHandler, responseHandler } from "../../../utils/common";
import dbConnect from "../../../utils/mongo";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  const session = await getSession({ req });

  dbConnect();

  if (method === "PUT") {
    try {
      if (req.body.uid === session?.user.id || session?.user.isFaculty) {
        if (req.body.password) {
          try {
            req.body.password = await bcrypt.hash(req.body.password, 8);
          } catch (error) {
            return errorHandler(error, res);
          }
        }

        const user = await User.findOneAndUpdate({ uid: id }, req.body, {
          new: true,
        });
        const userDoc = await user._doc;
        delete userDoc.password;

        responseHandler(userDoc, res);
      } else {
        errorHandler("You can update only your account", res);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  } else if (method === "GET") {
    try {
      const user = await User.findOne({ uid: id });
      const userDoc = user._doc;
      delete userDoc.password;

      responseHandler(userDoc, res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else if (method === "DELETE") {
    console.log(id);
    try {
      if (session.user.isFaculty) {
        const user = await User.deleteOne({ uid: id });
        console.log(user);
        responseHandler("Account has been deleted successfully", res);
      } else {
        return errorHandler("only faculty can delete accounts", res);
      }
    } catch (error) {
      res.status(400).json(error);
      // errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}