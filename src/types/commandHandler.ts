import type {NarrowedContext, Context} from 'telegraf';
import type {Update, Message} from 'telegraf/typings/core/types/typegram';

export type CommandHandler = (
	ctx: NarrowedContext<
		Context<Update>,
		{
			message: Update.New & Update.NonChannel & Message.TextMessage;
			update_id: number;
		}
	>
) => void;
