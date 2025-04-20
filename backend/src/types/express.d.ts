import { User } from "@prisma/client"; // supondo que você tem esse tipo User
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
