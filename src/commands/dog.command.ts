import 'reflect-metadata';

import { AxiosError } from 'axios';

import { dogApi } from '../api/dog.api';

import type { CommandHandler } from '../types/commandHandler';
import type { Command } from '../interfaces/command';

export class DogCommand implements Command {
	command: string = 'dog';
	help: string = `/${this.command} для получения картинки со случайной собакой`;

	handler: CommandHandler = async (ctx) => {
		const dogResponse = await dogApi.getRandomDog();

		if (dogResponse instanceof AxiosError) {
			return await ctx.reply('Произошла ошибка');
		}

		const { message } = dogResponse;

		await ctx.replyWithPhoto(message);
	};
}
