import type {TodayWeather, TodayWeatherResponse} from '../interfaces/todayWeather';

export const transformTodayWeatherResponse = (todayWeatherResponse: TodayWeatherResponse): TodayWeather => {
	const { weather, main, name: cityName } = todayWeatherResponse;
	const { icon: iconCode, description, id } = weather[0];
	const { feels_like: feelsLike, temp: temperature } = main;

	return {
		iconCode,
		description,
		feelsLike,
		temperature,
		cityName,
		id,
	};
};
