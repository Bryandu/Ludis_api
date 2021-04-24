import { Err } from '@/@types/erros.types';
import { NextFunction, Request, Response } from 'express';
export declare function errorMiddleware(err: Err, _req: Request, res: Response, next: NextFunction): void;
