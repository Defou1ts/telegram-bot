import type { MiddlewareHandler } from '../types/middlewareHandler';

export interface BotMiddleware {
	handler: MiddlewareHandler;
}
