import type { CommandHandler } from '../types/commandHandler';

export interface Command {
	command: string;
	help: string;

	handler: CommandHandler;
}
