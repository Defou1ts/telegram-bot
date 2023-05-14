import type { RateLimitConfig } from '../interfaces/rateLimitConfig';

export const limitConfig: RateLimitConfig = {
	window: 3000,
	limit: 1,
	onLimitExceeded: async (ctx, next) =>
		await ctx.reply('Превышен сообщений, подождите немного перед отправкой следующего'),
};
