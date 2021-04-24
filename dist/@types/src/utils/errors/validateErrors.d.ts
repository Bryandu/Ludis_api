import mongoose from 'mongoose';
import { Response } from 'express';
export declare class ValidateError {
    protected sendResponseErrorValidade(res: Response, error: mongoose.Error.ValidationError | Error): void;
    private validationResponse;
}
