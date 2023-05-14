import type { Middleware, Context } from 'telegraf';
import type { Update } from 'typegram';

export type MiddlewareHandler = Middleware<Context<Update>>;
