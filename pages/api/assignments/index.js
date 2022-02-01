import { getSession } from "next-auth/react";
import Assignment from "../../../models/Assignment";
import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const {
    method,
    query: { branch, semester, subject },
  } = req;
  const session = await getSession({ req });

  dbConnect();

  if (method === "POST") {
    try {
      if (session?.user.isFaculty) {
        const { title, desc, year, branch, subject } = req.body;
        validateAllOnce({
          title,
          desc,
          sem,
          branch,
          subject,
        });

        const assignment = await Assignment.create(req.body);

        responseHandler(assignment, res);
      } else {
        errorHandler("Only faculty can create assignments", res);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  } else if (method === "GET") {
    try {
      const assignments = await Assignment.aggregate([{ $match: {} }]);
      responseHandler(assignments, res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
