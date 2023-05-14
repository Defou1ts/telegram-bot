import type { MiddlewareHandler } from '../types/middlewareHandler';

export interface RateLimitConfig {
	window: number;
	limit: number;
	onLimitExceeded: MiddlewareHandler;
}
