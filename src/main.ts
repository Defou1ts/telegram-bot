import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';

import { TYPES } from './types';
import { App } from './app';
import { LoggerService } from './services/logger/logger.service';
import { CommandController } from './controllers/command/command.controller';

import type { ICommandController } from './controllers/command/command.controller.interface';
import type { ILoggerService } from './services/logger/logger.service.interface';
import type { interfaces } from 'inversify';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<ICommandController>(TYPES.CommandController).to(CommandController).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	void app.init();
	return { appContainer, app };
}

export const { appContainer, app } = bootstrap();
