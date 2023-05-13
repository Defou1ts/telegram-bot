import 'reflect-metadata';

import { inject, injectable } from 'inversify';

import { WeatherCommand } from '../../commands/weather.command';
import { CatCommand } from '../../commands/cat.command';
import { TYPES } from '../../types';
import { DogCommand } from '../../commands/dog.command';

import type { ICommandController } from './command.controller.interface';
import type { ILoggerService } from '../../services/logger/logger.service.interface';
import type { Telegraf, Context } from 'telegraf';
import type { Update } from 'telegraf/typings/core/types/typegram';
import type { Command } from '../../interfaces/command';

@injectable()
export class CommandController implements ICommandController {
	commands: Command[] = [];

	constructor(@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService) {
		this.commands.push(new WeatherCommand());
		this.commands.push(new CatCommand());
		this.commands.push(new DogCommand());
	}

	bindCommands(bot: Telegraf<Context<Update>>): void {
		this.commands.forEach(({ command, handler }) => {
			bot.command(command, handler.bind(command));
			this.loggerService.log(`Инициализирована комманда /${command}`);
		});
	}

	bindHelp(bot: Telegraf<Context<Update>>): void {
		let helpMessage = ``;

		this.commands.forEach((command) => {
			helpMessage += `\n ${command.help}`;
		});

		bot.help(async (ctx) => {
			void ctx.reply(helpMessage);
		});
	}
}
