import { createApp } from './app'
import { env } from './config/env';

const app = createApp();

app.listen(env.PORT, () => {
    console.log(`telemetry-api running on port ${env.PORT}`);
})