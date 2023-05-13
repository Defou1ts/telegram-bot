import type { Telegraf, Context } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import type { Command } from '../../interfaces/command';

export interface ICommandController {
	commands: Command[];

	bindCommands: (bot: Telegraf<Context<Update>>) => void;
	bindHelp: (bot: Telegraf<Context<Update>>) => void;
}
