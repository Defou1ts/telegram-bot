import axios, { AxiosError } from 'axios';

import { transformTodayWeatherResponse } from '../utils/transform';

import type { TodayWeatherResponse } from '../interfaces/todayWeather';
import type { AxiosInstance } from 'axios';

const token = process.env.OPENWEATHER_API_KEY as string;

const openWeatherApiInstance: AxiosInstance = axios.create({
	baseURL: `https://api.openweathermap.org/data/2.5`,
	params: {
		appid: token,
		units: 'metric',
	},
});

export const openWeatherApi = {
	async getTodayWeatherByCityName(city: string) {
		try {
			const { data } = await openWeatherApiInstance.get<TodayWeatherResponse>('/weather', {
				params: {
					q: city,
				},
			});

			return transformTodayWeatherResponse(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				return error;
			} else {
				return new AxiosError('Unexpected Error');
			}
		}
	},
};
