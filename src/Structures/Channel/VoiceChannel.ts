import {
	Overwrite,
	Guild,
	CategoryChannel,
	IVoiceChannel,
	EvolveClient,
	CHANNELTYPES,
} from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";

export class VoiceChannel extends Channel {
  public overwrites: Objex<string, Overwrite> = new Objex();

  public guild?: Guild;
  public position!: number;
  public name!: string;
  public bitrate!: number;
  public userLimit!: number;
  public parent?: CategoryChannel;

  constructor(public data: IVoiceChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Voice, client);
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.guild = this.client.guilds.get(this.data.guild_id);
  	this.position = this.data.position;
  	this.name = this.data.name;
  	this.bitrate = this.data.bitrate;
  	this.userLimit = this.data.user_limit;
  	this.parent = this.data.parent_id
  		? (this.client.channels.get(this.data.parent_id) as CategoryChannel)
  		: undefined;
  	return this;
  }
}
