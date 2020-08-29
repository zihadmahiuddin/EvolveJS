
import { Payload } from '../../../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '../../..';
import { GuildMember } from '../../../Structures/Guild/GuildMember';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { user_id, channel_id, message_id, guild_id, member, emoji } = payload.d

		let user = client.users.get(user_id)
		let channel = client.channels.get(channel_id)
		let message = client.messages.get(message_id)
		let guild = client.guilds.get(guild_id)
		let gMember = new GuildMember(member)
		let nEmoji = client.emojis.get(emoji.id)
		client.emit(EVENTS.MESSAGE_REACTION_ADD, nEmoji, gMember, message, user, channel, guild);
	}
}
/*
user_id	string	the id of the user
channel_id	string	the id of the channel
message_id	string	the id of the message
guild_id?	string	the id of the guild
member?	member object	the member who reacted if this happened in a guild
emoji	a partial emoji object	the emoji used to react - example
*/