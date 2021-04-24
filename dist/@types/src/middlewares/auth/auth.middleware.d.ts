import { NextFunction, Request, Response } from 'express';
export declare const authMiddleware: (req: Partial<Request>, res: Partial<Response>, next: NextFunction) => void;
