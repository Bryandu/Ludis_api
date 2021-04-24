export declare class InternalError extends Error {
    message: string;
    protected code: number;
    protected description?: string | undefined;
    constructor(message: string, code?: number, description?: string | undefined);
}
