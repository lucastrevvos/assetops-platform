import express from 'express';
import cors from 'cors'
import { healthRoutes } from './routes/health.routes';
import { telemetryRoutes } from './routes/telemetry.routes';
import { notFoundHandler } from './middlewares/not-found-handler';
import { errorHandler } from './middlewares/error-handler';

export function createApp() {
    const app = express();

    app.use(cors())
    app.use(express.json());

    app.use('/health', healthRoutes);
    app.use('/telemetry', telemetryRoutes)

    app.use(notFoundHandler)
    app.use(errorHandler)
    
    return app;
}