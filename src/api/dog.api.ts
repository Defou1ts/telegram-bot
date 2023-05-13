import axios, { AxiosError } from 'axios';

import type { DogResponse } from '../interfaces/dogResponse';

const baseURL = 'https://dog.ceo/api/breeds/image/random';

export const dogApi = {
	async getRandomDog() {
		try {
			const { data } = await axios.get<DogResponse>(baseURL);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return error;
			} else {
				return new AxiosError('Unexpected Error');
			}
		}
	},
};
