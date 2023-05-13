import 'reflect-metadata';

import { AxiosError } from 'axios';

import { catApi } from '../api/cat.api';

import type { CommandHandler } from '../types/commandHandler';
import type { Command } from '../interfaces/command';

export class CatCommand implements Command {
	command: string = 'cat';
	help: string = `/${this.command} для получения картинки со случайным котом`;

	handler: CommandHandler = async (ctx) => {
		const catResponse = await catApi.getRandomCat();

		if (catResponse instanceof AxiosError) {
			return await ctx.reply('Произошла ошибка');
		}

		const { data } = catResponse;

		await ctx.replyWithPhoto(data.url);
	};
}
