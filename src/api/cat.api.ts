import axios, { AxiosError } from 'axios';

import type { CatResponse } from '../interfaces/catResponse';

const baseURL = 'https://meow.senither.com/v1/random';

export const catApi = {
	async getRandomCat() {
		try {
			const { data } = await axios.get<CatResponse>(baseURL);
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
