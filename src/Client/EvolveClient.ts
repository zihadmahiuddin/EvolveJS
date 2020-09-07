import {
	Guild,
	User,
	Emoji,
	Role,
	Message,
	ClientUser,
	ClientOptions,
	rest,
} from "..";
import { Logger } from "sign-logger";
import { Objex } from "@evolvejs/objex";
import { EventEmitter } from "events";
import { Oauth2 } from "../Oauth2/Oauth2";
import { Structures } from "../Structures/Structures";
import { EvolveSocket } from "./Websocket/Websocket";
import { ChannelTypes } from "../Utils/Constants";

export class EvolveClient extends EventEmitter {
  public token: string;
  public options: ClientOptions;
  public guilds: Objex<string, Guild> = new Objex();
  public channels: Objex<string, ChannelTypes> = new Objex();
  public users: Objex<string, User> = new Objex();
  public emojis: Objex<string | null, Emoji> = new Objex();
  public roles: Objex<string, Role> = new Objex();
  public messages: Objex<string, Message> = new Objex();
  private _user!: ClientUser;
  public rest: rest = new rest(this);
  public oauth2!: Oauth2;
  public secret!: string;
  public structures: Structures = new Structures(this);
  public shardConnections: Objex<number, EvolveSocket> = new Objex();
  public logger: Logger = new Logger();
  public sessionID = "";

  public constructor(token: string, options: ClientOptions) {
  	super({ captureRejections: options.capturePromiseRejection });
  	this.token = token;
  	this.options = options;
  	if (!this.token) this.logger.error("No token provided");
  }

  public get user(): ClientUser {
  	return this._user;
  }

  public set user(user: ClientUser) {
  	this._user = user;
  }
}
