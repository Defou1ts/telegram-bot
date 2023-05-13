import 'dotenv/config.js';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Telegraf } from 'telegraf';

import { TYPES } from './types';

import type { ICommandController } from './controllers/command/command.controller.interface';
import type { ILoggerService } from './services/logger/logger.service.interface';
import type { Update } from 'telegraf/typings/core/types/typegram';
import type { Context } from 'telegraf';

@injectable()
export class App {
	bot: Telegraf<Context<Update>>;
	private readonly botToken: string;

	constructor(
		@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.CommandController) private readonly commandController: ICommandController
	) {
		this.botToken = process.env.BOT_TOKEN ?? '';
		this.bot = new Telegraf(this.botToken);
	}

	useStart() {
		this.bot.start((ctx) => {
			void ctx.reply('Привет!');
		});
	}

	useCommands() {
		this.commandController.bindCommands(this.bot);

		this.loggerService.log(`Команды бота загружены`);
	}

	useHelp() {
		this.commandController.bindHelp(this.bot);

		this.loggerService.log(`Инциализирована команда /help`);
	}

	public async init(): Promise<void> {
		this.useStart();
		this.useCommands();
		this.useHelp();

		void this.bot.launch().catch((err) => {
			this.loggerService.error(`Произошла ошибка ${err}`);
		});

		this.loggerService.log(`Бот успешно запущен`);
	}
}
