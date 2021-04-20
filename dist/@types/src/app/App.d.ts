import '../utils/module-alias';
import { Application } from 'express';
import { Server } from '@overnightjs/core';
export declare class SetupApp extends Server {
    private port;
    constructor(port?: unknown);
    init(): Promise<void>;
    close(): Promise<void>;
    private SetupExpress;
    private SetupControllers;
    private SetupDatabase;
    getApp(): Application;
    startApp(): void;
}
