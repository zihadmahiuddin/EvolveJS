
import { Payload } from '../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '..';
import { Message } from '../Structures/Message/Message';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let message = new Message(payload.d, client)
		client.emit(EVENTS.MESSAGE_UPDATE, (payload.d, shard));
	}
}
