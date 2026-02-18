import { Request, Response, NextFunction } from 'express'; // Ensure this is from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(':')[1]; 
  const secret = process.env.JWT_SECRET;


  if (!token || !secret) {
    res.status(401).json({ message: "Access Denied" });
    return; // Return void, not the response object
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Forbidden" });
      return; // Return void
    }
    (req as any).user = user; 
    next(); // This returns void correctly
  });
};