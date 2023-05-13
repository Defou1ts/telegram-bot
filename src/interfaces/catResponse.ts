export interface CatResponse {
	status: number;
	data: CatResponseData;
}

export interface CatResponseData {
	type: string;
	file: string;
	size: number;
	url: string;
}
