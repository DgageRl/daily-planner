import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        instrument: ObserveInstrument,
    });
    const port = Number(process.env.PORT ?? 3000);
    app.enableCors({ origin: true });
    await app.listen(port, '0.0.0.0');
    console.log(`API is running on port ${port}`);
}
await bootstrap();
//# sourceMappingURL=main.js.map