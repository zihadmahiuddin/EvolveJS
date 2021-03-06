/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Overwrite,
	Guild,
	CategoryChannel,
	ITextChannel,
	EvolveClient,
	CHANNELTYPES,
	Message,
	MessageEmbed,
} from "../..";
import { Channel } from "./Channel";
import { Objex } from "@evolvejs/objex";

export class TextChannel extends Channel {
  public overwrites: Objex<string, Overwrite> = new Objex();

  public guild?: Guild;
  public position!: number;
  public name!: string;
  public topic?: string;
  public nsfw!: boolean;
  public lastMessage?: string;
  public rateLimit!: number;
  public parent?: CategoryChannel;
  public lastPin?: number;
  public send!: (content: string | MessageEmbed) => Promise<Message>;

  constructor(public data: ITextChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Text, client);
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.guild = this.client.guilds.get(this.data.guild_id);
  	this.position = this.data.position;
  	this.name = this.data.name;
  	this.topic = this.data.topic || undefined;
  	this.nsfw = this.data.nsfw;
  	this.rateLimit = this.data.rate_limit_per_user;
  	this.parent = this.data.parent_id
  		? (this.client.channels.get(this.data.parent_id) as CategoryChannel)
  		: undefined;
  	this.lastPin = this.data.last_pin_timestamp;
  	this.send = async (content: string | MessageEmbed): Promise<Message> => {
  		return this.client.rest.sendMessage(content, this.id);
  	};
  	return this;
  }
}
