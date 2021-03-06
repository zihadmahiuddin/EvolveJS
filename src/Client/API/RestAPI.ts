/* eslint-disable no-mixed-spaces-and-tabs */

import {
	RestAPIHandler,
	EvolveClient,
	Guild,
	User,
	GuildMember,
	MessageEmbed,
	Message,
	ChannelResolver,
} from "../..";
import { Invite } from "../../Structures/Guild/Invite";
import { Emoji } from "../../Structures/Guild/Emoji";
import { ChannelTypes } from "../../Utils/Constants";
import { Channel } from "../../Structures/Channel/Channel";

/**
 * RestAPI Class
 *
 * @param {client} - Your EvolveClient
 */
export class RestAPI {
  public client: EvolveClient;
  public handler: RestAPIHandler;

  constructor(client: EvolveClient) {
  	this.client = client;
  	this.handler = new RestAPIHandler(this.client);
  }

  public async getGuild(guildID: string): Promise<Guild> {
  	return new Guild(
  		await this.handler.fetch({
  			endpoint: `guilds/${guildID}`,
  			method: "GET",
  		}),
  		this.client
  	);
  }

  public async getGuildChannels(guildID: string): Promise<ChannelTypes[]> {
  	const channels = await this.handler.fetch({
  		endpoint: `guilds/${guildID}/channels`,
  		method: "GET",
  	});

  	const channelArray: ChannelTypes[] = [];

  	for (const c of channels) {
  		channelArray.push(new Channel(c.id, c.type, this.client).resolve(c));
  	}

  	return channelArray;
  }

  public async getAuditLogs(guildID: string): Promise<JSON> {
  	return await this.handler.fetch({
  		endpoint: `/guilds/${guildID}/audit-logs`,
  		method: "POST",
  	});
  }

  public async getUser(userID: string): Promise<User> {
  	return new User(
  		await this.handler.fetch({
  			endpoint: `users/${userID}`,
  			method: "GET",
  		})
  	);
  }

  public async getGuildMembers(guildID: string): Promise<GuildMember[]> {
  	const memberArray = new Array<GuildMember>();
  	const member = await this.handler.fetch({
  		endpoint: `guilds/${guildID}/members`,
  		method: "GET",
  	});

  	for (const m of member) {
  		memberArray.push(m);
  	}

  	return memberArray;
  }

  public async sendMessage(
  	content: string | MessageEmbed,
  	channelID: string
  ): Promise<Message> {
  	let fetched;
  	if (typeof content == "string") {
  		fetched = await this.handler.fetch({
  			endpoint: `channels/${channelID}/messages`,
  			method: "POST",
  			message: {
  				content: content,
  			},
  		});
  	} else {
  		fetched = await this.handler.fetch({
  			endpoint: `channels/${channelID}/messages`,
  			method: "POST",
  			message: {
  				embed: content,
  			},
  		});
  	}
  	return new Message(fetched, this.client);
  }

  public async deleteMessage(
  	messageID: string,
  	channelID: string,
  	time: number
  ): Promise<NodeJS.Timeout> {
  	return setTimeout(async () => {
  		return await this.handler.fetch({
  			endpoint: `/channels/${channelID}/messages/${messageID}`,
  			method: "DELETE",
  		});
  	}, time);
  }

  public async banAdd(guildID: string, userID: string): Promise<void> {
  	return await this.handler.fetch({
  		endpoint: `guilds/${guildID}/bans/${userID}`,
  		method: "PUT",
  	});
  }

  public async banRemove(userID: string, guildID: string): Promise<void> {
  	return await this.handler.fetch({
  		endpoint: `guilds/${guildID}/bans/${userID}`,
  		method: "DELETE",
  	});
  }

  public async getChannel(channelID: string): Promise<ChannelTypes> {
  	const c = await this.handler.fetch({
  		endpoint: `/channels/${channelID}`,
  		method: "GET",
  	});
  	const channel = new Channel(c.id, c.type, this.client).resolve(c);

  	return channel;
  }

  public async getGuildEmojis(guildID: string): Promise<Emoji[]> {
  	const fetched = await this.handler.fetch({
  		endpoint: `/guilds/${guildID}/emojis`,
  		method: "GET",
  	});
  	const emojiArray: Emoji[] = [];

  	for (const emoji of fetched) {
  		emojiArray.push(new Emoji(emoji));
  	}
  	return emojiArray;
  }

  public async getGuildInvites(guildID: string): Promise<Invite[]> {
  	const fetched = await this.handler.fetch({
  		endpoint: `/guilds/${guildID}/invites`,
  		method: "GET",
  	});

  	const invite: Invite[] = [];
  	for (const invite of fetched) {
  		invite.push(new Invite(invite, this.client));
  	}

  	return invite;
  }

  public async getChannelInvites(channelID: string): Promise<Array<Invite>> {
  	const fetched = await this.handler.fetch({
  		endpoint: `/channels/${channelID}/invites`,
  		method: "GET",
  	});

  	const inviteArray: Array<Invite> = [];
  	for (const f of fetched) {
  		inviteArray.push(new Invite(f, this.client));
  	}
  	return inviteArray;
  }
}
