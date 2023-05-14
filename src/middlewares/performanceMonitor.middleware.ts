import 'reflect-metadata';

import { injectable, inject } from 'inversify';

import { TYPES } from '../types';

import type { ILoggerService } from '../services/logger/logger.service.interface';
import type { BotMiddleware } from '../interfaces/botMiddleware';
import type { MiddlewareHandler } from '../types/middlewareHandler';

@injectable()
export class PerformanceMonitorMiddleware implements BotMiddleware {
	constructor(@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService) {}

	handler: MiddlewareHandler = async (ctx, next) => {
		const start = Date.now();
		await next();
		const ms = Date.now() - start;

		if (ms > 1000) {
			this.loggerService.warn(`Внимание! Критическое время выполнения последнего запроса ${ms} ms`);
		} else {
			this.loggerService.log(`Время выполнения последнего запроса ${ms} ms`);
		}
	};
}
