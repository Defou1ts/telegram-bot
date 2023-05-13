import 'reflect-metadata';

import { AxiosError } from 'axios';

import { ERRORS } from '../constants/errors';
import { openWeatherApi } from '../api/openweather.api';

import type { CommandHandler } from '../types/commandHandler';
import type { Command } from '../interfaces/command';

export class WeatherCommand implements Command {
	command: string = 'weather';
	help: string = `/${this.command} <название города> для получения текущей погоды в вашем городе`;

	handler: CommandHandler = async (ctx) => {
		const message = ctx.message.text.split(' ');
		message.shift();

		if (message.length === 0) {
			await ctx.reply(ERRORS.NOT_ENOUGH_ARGUMENTS);
			return await ctx.reply(this.help);
		}

		if (message.length > 1) {
			await ctx.reply(ERRORS.TOO_MANY_ARGUMENTS);
			return await ctx.reply(this.help);
		}

		const city = message[0];
		const weather = await openWeatherApi.getTodayWeatherByCityName(city);

		if (weather instanceof AxiosError) {
			return await ctx.reply(ERRORS.CITY_NOT_FOUND);
		}

		const { cityName, temperature, feelsLike } = weather;

		await ctx.reply(`Город: ${cityName}\nТемпература: ${temperature}\nОщущается как: ${feelsLike}`);
	};
}
