import { User, IGroupChannel, EvolveClient, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";

export class GroupChannel extends Channel {
  public recipients: Objex<string, User> = new Objex();

  public name?: string;
  public lastMessage?: string;
  public icon?: string;
  public owner?: User;
  public applicationID?: string;
  public lastPin?: number;

  constructor(public data: IGroupChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Group, client);
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	(async (data: IGroupChannel) => {
  		this.owner = await this.client.rest.getUser(data.owner_id);
  	})(this.data);

  	this.name = this.data.name;
  	this.lastMessage = this.data.last_message_id || undefined;
  	this.icon = this.data.icon || undefined;
  	this.applicationID = this.data.application_id;
  	this.lastPin = this.data.last_pin_timestamp;

  	return this;
  }
}
