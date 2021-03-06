import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Channel } from "../..";

export class ChannelEvents extends BaseEvent {
	constructor(client: EvolveClient, public channel: Channel, shard: number) {
		super(shard, client);
	}
}
